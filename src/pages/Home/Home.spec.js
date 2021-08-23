import { render } from "@testing-library/react";
import Home from "./Home";

describe("Home", () => {
  it("render Home component with home classname", () => {
    const { container } = render(<Home />);

    expect(container.firstElementChild.className.includes("home")).toBe(true);
  });
});
