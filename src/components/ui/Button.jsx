import React from 'react';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  icon: Icon, 
  iconPosition = 'left',
  ...props 
}) => {
  const baseStyles = 'btn transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-400',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <i className={`bi ${Icon} mr-2`}></i>}
      {children}
      {Icon && iconPosition === 'right' && <i className={`bi ${Icon} ml-2`}></i>}
    </button>
  );
};

export default Button;
