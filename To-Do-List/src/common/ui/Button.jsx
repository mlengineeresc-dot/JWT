import React from "react";

const Button = ({ type, onClick, label  ,className }) => {
  return <button onClick={onClick} type={type} className={className} >{label}</button>;
};

export default Button;
