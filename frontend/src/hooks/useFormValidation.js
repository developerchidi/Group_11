import { useState } from 'react';

export const useFormValidation = (initialValue = '', maxLength = 500) => {
    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');

    const validate = (text) => {
        if (!text.trim()) {
            setError('Nội dung không được để trống.');
            return false;
        }
        if (text.length > maxLength) {
            setError(`Nội dung không được vượt quá ${maxLength} ký tự.`);
            return false;
        }
        setError('');
        return true;
    };

    const handleChange = (e) => {
        const val = e.target.value;
        setValue(val);
        validate(val);
    };

    return {
        value,
        setValue,
        error,
        handleChange,
        isValid: value.trim().length > 0 && value.length <= maxLength
    };
};
