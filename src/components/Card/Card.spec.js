import { render } from "@testing-library/react";
import Card from "./Card";

describe("Card", () => {
  const card = {
    deck: 3,
    isDown: true,
    isSelected: false,
    rank: "J",
    suit: "heart",
  };

  it("render Card component", () => {
    render(<Card card={card} isSelected={true} isDown={false} />);
  });

  it("render Card component with card and heart classname", () => {
    const { container } = render(
      <Card card={card} isSelected={false} isDown={false} />
    );

    expect(container.firstElementChild.className.includes("card heart")).toBe(
      true
    );
  });

  it("render Card component with card,heart and card-selected classname", () => {
    const { container } = render(
      <Card card={card} isSelected={true} isDown={false} />
    );

    expect(
      container.firstElementChild.className.includes("card heart card-selected")
    ).toBe(true);
  });

  it("render Card component with classname card and card-down", () => {
    const { container } = render(
      <Card card={card} isSelected={false} isDown={true} />
    );

    expect(
      container.firstElementChild.className.includes("card card-down")
    ).toBe(true);
  });

  it("render Card component with correct rank text", () => {
    const { getAllByText } = render(
      <Card card={card} isSelected={false} isDown={false} />
    );
    expect(getAllByText(card.rank)).toBeTruthy();
  });
});
