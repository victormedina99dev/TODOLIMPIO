import React from 'react';

const Card = ({ children, className = '', isGlass = false, animate = false }) => {
  const baseStyles = isGlass ? 'glass-card' : 'card p-6';
  const animationStyles = animate ? 'animate-slide-up' : '';
  
  return (
    <div className={`${baseStyles} ${animationStyles} ${className}`}>
      {children}
    </div>
  );
};

export default Card;
