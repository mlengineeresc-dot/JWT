import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConditionalRendering from "./ConditionalRendering";
// import { expect } from "vitest";

test("conditional rendering", async () => {
  const user = userEvent.setup();
  render(<ConditionalRendering />);
  expect(screen.queryByText("Hello World")).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Click" }));
expect(screen.getByText("Hello World")).toBeInTheDocument();});
