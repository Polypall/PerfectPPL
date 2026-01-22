
import React from 'react';

interface HeartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'danger';
}

const HeartButton: React.FC<HeartButtonProps> = ({ 
  children, 
  size = 'md', 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 text-xs',
    md: 'w-24 h-24 text-sm font-bold',
    lg: 'w-32 h-32 text-base font-black',
  };

  const variantClasses = {
    primary: 'bg-pink-500 hover:bg-pink-600 text-white',
    secondary: 'bg-white hover:bg-pink-50 text-pink-500 border-2 border-pink-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button 
      className={`heart-btn ${sizeClasses[size]} ${variantClasses[variant]} ${className} shadow-xl hover:scale-110 active:scale-95 transition-all duration-300`}
      {...props}
    >
      <span className="text-center px-4 leading-tight">{children}</span>
    </button>
  );
};

export default HeartButton;
