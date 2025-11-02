import React from "react";

const Button = ({ label, type, className, onClick, disabled}) => {
  return (
    <button onClick={onClick} type={type} className={className} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
