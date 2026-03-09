import React, { useMemo, useState } from 'react';
import ThemeSelector from './ThemeSelector';
import Toast from './Toast';
import { MAX_CONFESSION_LENGTH, validatePostForm } from '../utils/formValidation';

function PostForm({ user, onPosted }) {
  const [content, setContent] = useState('');
  const [color, setColor] = useState('slate');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const remainCharacters = useMemo(() => MAX_CONFESSION_LENGTH - content.length, [content]);

  function showToast(type, message) {
    setToast({ type, message, id: Date.now() });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationResult = validatePostForm({ content, color, user });
    setErrors(validationResult.errors);

    if (!validationResult.isValid) {
      if (validationResult.errors.identity) {
        showToast('error', validationResult.errors.identity);
      }
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch('/api/confessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          author_alias: user.alias,
          author_id: user.id,
          color,
        }),
      });

      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = body?.error?.message || 'Could not submit confession. Please try again.';
        throw new Error(message);
      }

      setContent('');
      setErrors({});
      showToast('success', 'Confession posted successfully.');

      if (onPosted) {
        onPosted(body);
      }
    } catch (error) {
      showToast('error', error.message || 'Unexpected error while posting confession.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 md:p-6 shadow-xl">
      <h3 className="text-xl font-bold text-white">Create a confession</h3>
      <p className="text-sm text-slate-400 mt-1">Post anonymously as your generated identity.</p>

      <form className="mt-5 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="confession-content" className="text-sm font-medium text-slate-300">
            Content
          </label>
          <textarea
            id="confession-content"
            rows={5}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);

              if (errors.content) {
                setErrors((previous) => ({ ...previous, content: '' }));
              }
            }}
            className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-900 p-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            placeholder="Write your story here..."
            maxLength={MAX_CONFESSION_LENGTH}
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-xs text-slate-500">Remaining: {remainCharacters}</p>
            {errors.content ? <p className="text-xs text-rose-400">{errors.content}</p> : null}
          </div>
        </div>

        <ThemeSelector
          value={color}
          onChange={(nextColor) => {
            setColor(nextColor);

            if (errors.color) {
              setErrors((previous) => ({ ...previous, color: '' }));
            }
          }}
          error={errors.color}
        />

        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-500">Posting as: {user?.alias || '...'}</p>
          <button
            type="submit"
            disabled={submitting || !user?.id || !user?.alias}
            className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-600 disabled:text-slate-300"
          >
            {submitting ? 'Posting...' : 'Post confession'}
          </button>
        </div>
      </form>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </section>
  );
}

export default PostForm;
