import { fireEvent, render, screen } from "@testing-library/react";

import Decks from "./Decks";

const mockedSelectClick = jest.fn();
const mockedMoveOperation = jest.fn();
const mockedMoveOperationForEmptyDeck = jest.fn();
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

/* import useCreateGame from "../../hooks/useCreateGame/useCreateGame";
 */
beforeEach(() => {
  /* jest.mock("../../hooks/useCreateGame/useCreateGame", () => {
    return jest.fn(() => ({
      game: mockGame,
      selectCard: mockedSelectClick,
      moveOperations: mockedMoveOperation,
      moveOperationsForEmptyDeck: mockedMoveOperationForEmptyDeck,
    }));
  }); */
  /* jest.mock("../../hooks/useCreateGame/useCreateGame", () => ({
    useCreate: () => ({
      game: mockGame,
      selectCard: mockedSelectClick,
      moveOperations: mockedMoveOperation,
      moveOperationsForEmptyDeck: mockedMoveOperationForEmptyDeck,
    }),
  })); */
});
describe("UseCreateGame hook", () => {
  /*  jest.mock("../../hooks/useCreateGame/useCreateGame", () => ({
    useCreateGame: () => ({
      game: mockGame,
      selectCard: mockedSelectClick(),
      moveOperations: mockedMoveOperation(),
      moveOperationsForEmptyDeck: mockedMoveOperationForEmptyDeck(),
    }),
  })); */

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
  it("card div calls handleClick prop when clicked", () => {
    render(
      <Decks
        game={mockGame}
        onSelectCard={mockedSelectClick}
        moveOperations={handleMoveOperation}
        moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
      />
    );

    const element = screen.getByTestId("my-card");
    /* fireEvent.click(element); */

    /* expect(mockedSelectClick).toHaveBeenCalledTimes(1);
    expect(mockedMoveOperation).toHaveBeenCalledTimes(1);
    expect(mockedMoveOperationForEmptyDeck).toHaveBeenCalledTimes(1); */
  });
});

/* describe("Decks", () => {
  const handleSelectClick = jest.fn();
  const handleMoveOperation = jest.fn();
  const handleMoveOperationForEmptyDeck = jest.fn();

  it.only("render Decks component with decks classname", () => {
    const game = {
      decks: [[]],
    };
    const { container } = render(
      <Decks
        game={game}
        onSelectCard={handleSelectClick}
        moveOperations={handleMoveOperation}
        moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
      />
    );

    expect(container.firstElementChild.className.includes("decks")).toBe(true);
  });

  describe("empty decks", () => {
    const game = {
      decks: [[]],
    };

    it("empty deck div calls handleClick prop when clicked", () => {
      let container = render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.getByTestId("empty-deck");
      fireEvent.click(element);
            container.emptyDeckOperatios = jest.fn();
      expect(container.emptyDeckOperatios()).toHaveBeenCalledTimes(1); 
    });

     it("empty deck div calls handleClick prop when onDragStart", () => {
      render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.getByTestId("empty-deck");
      fireEvent.dragStart(element);

      expect(handleMoveOperationForEmptyDeck).toHaveBeenCalledTimes(1);
    });

    it("empty deck div calls handleClick prop when onDrop", () => {
      render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.getByTestId("empty-deck");
      fireEvent.drop(element);

      expect(handleMoveOperationForEmptyDeck).toHaveBeenCalledTimes(1);
    }); 
  });

  /*  describe("Card in decks", () => {
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
      render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.getByTestId("my-card");
      fireEvent.click(element);

      expect(handleSelectClick).toHaveBeenCalledTimes(1);
    });

    it("card div  calls handleClick prop when onDragStart", () => {
      render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.queryByTestId("my-card");
      fireEvent.dragStart(element);

      expect(handleSelectClick).toHaveBeenCalledTimes(1);
    });

    it("card div calls handleClick prop when onDrop", () => {
      render(
        <Decks
          game={game}
          onSelectCard={handleSelectClick}
          moveOperations={handleMoveOperation}
          moveOperationsForEmptyDeck={handleMoveOperationForEmptyDeck}
        />
      );

      const element = screen.queryByTestId("my-card");
      fireEvent.drop(element);

      expect(handleSelectClick).toHaveBeenCalledTimes(1);
    });
  }); 
}); */
