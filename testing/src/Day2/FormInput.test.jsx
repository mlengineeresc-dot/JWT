import FormInput from "./FormInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "vitest";

test("updates input as user types", async () => {
  const user = userEvent.setup();
  render(<FormInput />);
  const input = screen.getByLabelText("Name");
  await user.type(input, "hello");
  expect(screen.getByText("Entered value:hello"));
});
