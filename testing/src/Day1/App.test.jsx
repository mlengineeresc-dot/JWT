import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";


test("button click works", async () => {
  const user = userEvent.setup();
  render(<App />);

  await user.click(screen.getByRole("button", { name: "Click" }));
});
test("renders heading text", () => {
    render(<App />);
  expect(
    screen.getByRole("heading", { name: "Hello RTL" })
  ).toBeInTheDocument();
});