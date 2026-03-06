import React from 'react';

const COLORS = [
    { name: 'slate', bg: 'bg-slate-700', border: 'border-slate-500' },
    { name: 'blue', bg: 'bg-blue-600', border: 'border-blue-400' },
    { name: 'teal', bg: 'bg-teal-600', border: 'border-teal-400' },
    { name: 'rose', bg: 'bg-rose-600', border: 'border-rose-400' },
    { name: 'amber', bg: 'bg-amber-600', border: 'border-amber-400' },
    { name: 'violet', bg: 'bg-violet-600', border: 'border-violet-400' },
];

const ThemeSelector = ({ selectedColor, onSelect }) => {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <span className="text-sm text-slate-400 w-full mb-1">Chọn chủ đề bài đăng:</span>
            {COLORS.map((color) => (
                <button
                    key={color.name}
                    type="button"
                    onClick={() => onSelect(color.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-200 transform hover:scale-110 ${color.bg} ${selectedColor === color.name ? 'border-white scale-125 shadow-lg' : color.border
                        }`}
                    title={color.name.charAt(0).toUpperCase() + color.name.slice(1)}
                />
            ))}
        </div>
    );
};

export default ThemeSelector;
