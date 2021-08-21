import { fireEvent, render, screen } from "@testing-library/react";
import Decks from "./Decks";

describe("Decks", () => {
  const handleClick = jest.fn();

  it("render Decks component with decks classname", () => {
    const game = {
      decks: [[]],
    };
    const { container } = render(
      <Decks game={game} onSelectCard={handleClick} />
    );

    expect(container.firstElementChild.className.includes("decks")).toBe(true);
  });

  describe("empty decks", () => {
    const game = {
      decks: [[]],
    };

    it("empty deck div calls handleClick prop when clicked", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.getByTestId("empty-deck");
      fireEvent.click(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("empty deck div  calls handleClick prop when onDragStart", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.getByTestId("empty-deck");
      fireEvent.dragStart(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("empty deck div calls handleClick prop when onDrop", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.getByTestId("empty-deck");
      fireEvent.drop(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Card in decks", () => {
    const game = {
      decks: [[]],
    };
    game.decks[0][0] = {
      deck: 5,
      isDown: true,
      isSelected: false,
      rank: "A",
      suit: "heart",
    };

    it("card div calls handleClick prop when clicked", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.getByTestId("my-card");
      fireEvent.click(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("card div  calls handleClick prop when onDragStart", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.queryByTestId("my-card");
      fireEvent.dragStart(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("card div calls handleClick prop when onDrop", () => {
      render(<Decks game={game} selectCard={handleClick} />);

      const element = screen.queryByTestId("my-card");
      fireEvent.drop(element);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
