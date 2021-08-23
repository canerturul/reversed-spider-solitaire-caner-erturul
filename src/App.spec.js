import { render, screen } from "@testing-library/react";
import App from "./App";

it("render App component with app classname", () => {
  const { container } = render(<App />);

  expect(container.firstElementChild.className.includes("App")).toBe(true);
});
