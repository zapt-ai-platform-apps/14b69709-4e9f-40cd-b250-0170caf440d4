import React from 'react';

const TextArea = ({ 
  value, 
  onChange, 
  placeholder,
  className = '',
  rows = 4
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent box-border ${className}`}
    />
  );
};

export default TextArea;