import React, { useEffect } from 'react';

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      onClose();
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [toast, onClose]);

  if (!toast) {
    return null;
  }

  const classes =
    toast.type === 'success'
      ? 'border-emerald-500/60 bg-emerald-500/15 text-emerald-200'
      : 'border-rose-500/60 bg-rose-500/15 text-rose-200';

  return (
    <div className="fixed right-4 top-20 z-50 max-w-xs">
      <div
        className={['rounded-xl border px-4 py-3 shadow-lg backdrop-blur-sm animate-in slide-in-from-top-2 duration-300', classes].join(' ')}
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold opacity-80 hover:opacity-100"
            aria-label="Close notification"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
