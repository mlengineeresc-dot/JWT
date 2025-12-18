import LoginForm from "./LoginForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { expect, test, vi } from "vitest";

test("updates input when typing", async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  const input = screen.getByLabelText("Email");
  await user.type(input, "email");
  expect(input).toHaveValue("email");
});

test("show error message if email is empty", async () => {
  const user = userEvent.setup();
  render(<LoginForm onSubmit={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: /submit/i }));
  expect(screen.getByRole("checking")).toHaveTextContent("email required");
});

test("test onsubmit handler is called when clicked on submit button", async () => {
  const user = userEvent.setup();
  const mockfn = vi.fn();
  render(<LoginForm onSubmit={mockfn} />);
  await user.type(screen.getByLabelText("Email"), "test@gmail.com");
  await user.click(screen.getByRole("button", { name: /submit/i }));
  expect(mockfn).toHaveBeenCalledTimes(1);
  expect(mockfn).toHaveBeenCalledWith("test@gmail.com");
});
