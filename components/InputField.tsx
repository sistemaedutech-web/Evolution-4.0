
import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, containerClassName = '', ...props }) => {
  const inputId = id || `input-${label.replace(/\s+/g, '-')}`;
  return (
    <div className={containerClassName}>
      <label htmlFor={inputId} className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        id={inputId}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
        {...props}
      />
    </div>
  );
};

export default InputField;
