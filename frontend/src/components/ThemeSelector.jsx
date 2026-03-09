import React from 'react';
import { THEME_OPTIONS } from '../utils/formValidation';

function ThemeSelector({ value, onChange, error }) {
  return (
    <div>
      <p className="text-sm text-slate-300 mb-3">Choose card theme</p>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {THEME_OPTIONS.map((option) => {
          const active = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={[
                'rounded-xl border px-2 py-2 text-xs font-semibold transition',
                active
                  ? 'border-white bg-slate-700 text-white'
                  : 'border-slate-600 bg-slate-800 text-slate-300 hover:border-slate-400',
              ].join(' ')}
              aria-pressed={active}
            >
              <span className={['inline-block w-2.5 h-2.5 rounded-full mr-2 align-middle', option.chipClass].join(' ')} />
              {option.label}
            </button>
          );
        })}
      </div>
      {error ? <p className="mt-2 text-xs text-rose-400">{error}</p> : null}
    </div>
  );
}

export default ThemeSelector;
