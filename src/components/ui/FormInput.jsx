import React from 'react';

const FormInput = ({ 
  label, 
  name, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  error, 
  icon: Icon,
  ...props 
}) => {
  return (
    <div className="group space-y-2">
      <label className="text-sm font-bold text-surface-400 group-focus-within:text-primary-500 transition-colors px-1">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 group-focus-within:text-primary-500 transition-colors pointer-events-none">
            <i className={`bi ${Icon} text-lg`}></i>
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full transition-all duration-300
            bg-surface-900/50 dark:bg-surface-900/50 
            border-2 rounded-2xl py-4
            ${Icon ? 'pl-12 pr-6' : 'px-6'}
            ${error 
              ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' 
              : 'border-surface-800 focus:border-primary-500 focus:bg-surface-900 shadow-inner'}
            text-white placeholder:text-surface-600 outline-none
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-xs font-medium mt-1 px-1 animate-fade-in">{error}</p>}
    </div>
  );
};

export default FormInput;
