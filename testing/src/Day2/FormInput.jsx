import React, { useState } from "react";

const FormInput = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <p>Entered value:{value}</p>
    </div>
  );
};

export default FormInput;
