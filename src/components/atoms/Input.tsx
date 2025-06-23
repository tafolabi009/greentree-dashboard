import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400 ${className}`}
    {...props}
  />
);

export default Input; 