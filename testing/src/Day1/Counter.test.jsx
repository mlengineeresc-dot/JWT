import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";
import { expect } from "vitest";

test("increment count when button is clicked", async () => {
  const user = userEvent.setup();
  render(<Counter initialValue={5} />);
  expect(screen.getByText("count:5")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Increment" }));

  expect(screen.getByText("count:1")).toBeInTheDocument();
});

test("conditional rendering", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  expect(screen.queryByText("Count value incremented")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Increment" }));
  expect(screen.getByText("Count value incremented")).toBeInTheDocument();
});
