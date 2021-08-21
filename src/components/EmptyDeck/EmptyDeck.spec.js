import { render } from "@testing-library/react";
import EmptyDeck from "./EmptyDeck";

describe("EmptyDeck", () => {
  it("render EmptyDeck component with classname", () => {
    const { container } = render(<EmptyDeck />);

    expect(container.firstElementChild.className.includes("empty-deck")).toBe(
      true
    );
  });
});
