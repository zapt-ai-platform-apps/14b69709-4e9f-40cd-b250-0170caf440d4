import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };
  
  return (
    <div className={`${sizeClasses[size]} border-t-transparent border-blue-500 rounded-full animate-spin ${className}`}></div>
  );
};

export default Loader;