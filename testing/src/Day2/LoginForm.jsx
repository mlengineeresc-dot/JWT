import React, { useState } from "react";

const LoginForm = ({onSubmit}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError("email required");
      return;
    }
    setEmail("");
    onSubmit(email)
  };
  return (
    <div>
      <form onSubmit={handlesubmit}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p role="checking">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
