import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/login">
        <button>Login</button>
      </Link>

      <br />
      <br />

      <Link to="/register">
        <button>Register</button>
      </Link>

      <br />
      <br />
      <Link to="/dashboard">
        <button>Go to Dashboard</button>
      </Link>
    </div>
  );
};

export default Home;
