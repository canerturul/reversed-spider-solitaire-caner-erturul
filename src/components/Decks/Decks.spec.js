import { render } from "@testing-library/react";

import Decks from "./Decks";

const handleSelectClick = jest.fn();
const handleMoveOperation = jest.fn();
const handleMoveOperationForEmptyDeck = jest.fn();
const mockGame = {
  decks: [[]],
};

mockGame.decks[0][0] = {
  deck: 5,
  isDown: true,
  isSelected: false,
  rank: "A",
  suit: "heart",
};

describe("UseCreateGame hook", () => {
  it("render Decks component with decks classname", () => {
    const { container } = render(
      <Decks
        game={mockGame}
        onSelectCard={handleSelectClick}
        moveOperations={handleMoveOperation}
        moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
      />
    );

    expect(container.firstElementChild.className.includes("decks")).toBe(true);
  });
});
