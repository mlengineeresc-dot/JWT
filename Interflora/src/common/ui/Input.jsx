import React from "react";

const Input = ({ type, className, onChange, name, value,placeholder }) => {
  return (
    <input
      type={type}
      className={className}
      onChange={onChange}
      value={value}
      name={name}
      placeholder={placeholder}
    />
  );
};

export default Input;
