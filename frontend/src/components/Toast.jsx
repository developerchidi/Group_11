import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    const bgColor = type === 'success' ? 'bg-teal-500' : 'bg-rose-500';

    return (
        <div className={`fixed bottom-8 right-8 ${bgColor} text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce-in z-50`}>
            <span className="text-xl">{type === 'success' ? '✅' : '❌'}</span>
            <p className="font-semibold">{message}</p>
            <button onClick={onClose} className="ml-2 hover:opacity-70 transition-opacity">
                ✕
            </button>
        </div>
    );
};

export default Toast;
