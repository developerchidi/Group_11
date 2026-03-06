import React, { useState } from 'react';
import { useIdentity } from '../context/IdentityContext';
import ThemeSelector from './ThemeSelector';
import Toast from './Toast';
import { useFormValidation } from '../hooks/useFormValidation';

const PostForm = ({ onPostSuccess }) => {
    const { user } = useIdentity();
    const [selectedColor, setSelectedColor] = useState('slate');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState(null);
    const { value, handleChange, error, isValid, setValue } = useFormValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isValid || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/confessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: value,
                    author_alias: user?.alias || 'Ẩn danh',
                    author_id: user?.id || 'unknown',
                    color: selectedColor,
                }),
            });

            if (response.ok) {
                setValue('');
                setSelectedColor('slate');
                if (onPostSuccess) onPostSuccess();
                setNotification({ message: 'Đăng bài thành công! 🎉', type: 'success' });
            } else {
                const data = await response.json();
                setNotification({
                    message: `Lỗi: ${data.error?.message || 'Không thể đăng bài'}`,
                    type: 'error'
                });
            }
        } catch (err) {
            console.error('Submit error:', err);
            setNotification({ message: 'Lỗi kết nối server.', type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-2xl mb-12 transition-all duration-300`}>
            {notification && (
                <Toast
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-teal-400 flex items-center justify-center font-bold text-slate-900">
                    {user?.alias?.charAt(0) || '?'}
                </div>
                <div>
                    <p className="text-sm font-semibold text-blue-400">{user?.alias || 'Đang tải định danh...'}</p>
                    <p className="text-xs text-slate-500 font-mono">ID: {user?.id?.substring(0, 8)}...</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="relative mb-4">
                    <textarea
                        value={value}
                        onChange={handleChange}
                        placeholder="Chia sẻ dòng code hoặc tâm tư của bạn ở đây..."
                        className={`w-full bg-slate-900/50 border-2 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all min-h-[150px] resize-none ${error ? 'border-rose-500/50' : 'border-slate-700'
                            }`}
                    />
                    <div className="absolute bottom-3 right-3 flex items-center gap-2">
                        <span className={`text-xs ${value.length > 500 ? 'text-rose-500' : 'text-slate-500'}`}>
                            {value.length}/500
                        </span>
                    </div>
                </div>

                {error && <p className="text-rose-400 text-xs mb-4 px-1">{error}</p>}

                <ThemeSelector selectedColor={selectedColor} onSelect={setSelectedColor} />

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`px-8 py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95 ${!isValid || isSubmitting
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40'
                            }`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Đang gửi...
                            </span>
                        ) : (
                            'Đăng Confession'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;
