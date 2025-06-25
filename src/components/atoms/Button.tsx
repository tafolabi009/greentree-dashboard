import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-200 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 active:scale-95 ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button; 