import { fireEvent, render, screen } from "@testing-library/react";
import CardPile from "./CardPile";

describe("CardPile", () => {
  const game = {
    decks: [[]],
  };
  const handleClick = jest.fn();

  it("render CardPile component with classname", () => {
    const { container } = render(
      <CardPile game={game} distributeCards={handleClick} />
    );

    expect(container.firstElementChild.className.includes("card-pile")).toBe(
      true
    );
  });

  it("calls onClick prop when clicked", () => {
    render(<CardPile game={game} distributeCards={handleClick} />);
    const element = screen.getByTestId("card-pile");
    fireEvent.click(element);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
