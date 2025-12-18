import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import FetchUsers from "./FetchUsers";
import { expect, test } from "vitest";

test("loading state", () => {
  global.fetch = vi.fn(() => new Promise(() => {}));

  render(<FetchUsers />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("renders user from API", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve([{ id: 1, username: "John" }]),
    })
  );

  render(<FetchUsers />);

  expect(await screen.findByText("John")).toBeInTheDocument();
});

test("testing error states", async () => {
  global.fetch = vi.fn(() => Promise.reject("api error"));
  render(<FetchUsers />);

  expect(await screen.findByText("Something went wrong")).toBeInTheDocument();
});
