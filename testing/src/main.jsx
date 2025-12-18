import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./Day1/App.jsx";
import Counter from "./Day1/Counter.jsx";
import ConditionalRendering from "./Day1/ConditionalRendering.jsx";
import FormInput from "./Day2/FormInput.jsx";
import LoginForm from "./Day2/LoginForm.jsx";
import FetchUsers from "./Day2/FetchUsers.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <Counter initialValue={0} />
    <br />
    <br />
    <FormInput />
    <br />
    <br />
    <LoginForm />
    {/* <ConditionalRendering /> */}
    <FetchUsers />
  </StrictMode>
);
