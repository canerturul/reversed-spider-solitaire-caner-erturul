import { renderHook, act } from "@testing-library/react-hooks";
import useCreateGame from "./useCreateGame";

describe("useCreateGame Hook", () => {
  afterAll(() => {
    jest.useRealTimers();
  });
  it("should use creategame", () => {
    const { result } = renderHook(() => useCreateGame());
    const {
      game,
      selectCard,
      moveOperations,
      moveOperationsForEmptyDeck,
      restartGame,
      distributeCards,
      undoGame,
    } = result.current;

    expect(typeof game).toBe("object");
    expect(selectCard).toBeDefined();
    expect(restartGame).toBeDefined();
    expect(distributeCards).toBeDefined();
    expect(undoGame).toBeDefined();
  });

  it("should select card when isSelectedCard false", () => {
    const { result } = renderHook(() => useCreateGame());
    const { game, selectCard } = result.current;
    const card = game.decks[0][5];
    const deck = game.decks[0];
    expect(card.isSelected).toBe(false);

    act(() => {
      selectCard(card, deck, false);
    });
    expect(card.isSelected).toBe(true);
  });

  it("should not move card", () => {
    const { result } = renderHook(() => useCreateGame());
    const { game, selectCard, moveOperations } = result.current;

    const card = game.decks[0][5];
    const card2 = game.decks[1][5];
    const deck = game.decks[0];

    expect(card.isSelected).toBe(false);

    act(() => {
      selectCard(card, deck);
    });

    expect(card.isSelected).toBe(true);

    act(() => {
      moveOperations(card2, deck);
    });

    expect(card2.isSelected).toBe(false);
  });

  it("should reset game", () => {
    const { result } = renderHook(() => useCreateGame());
    const { game, restartGame } = result.current;

    const undoDeck = [];
    undoDeck.push(game.decks[0]);
    act(() => {
      restartGame();
    });

    expect(game.decks[0]).not.toEqual(undoDeck);
  });
  it("should distribute cards", () => {
    const { result } = renderHook(() => useCreateGame());
    const { game, distributeCards } = result.current;

    expect(game.decks[10].length).toBe(5);

    act(() => {
      distributeCards();
    });

    expect(game.decks[10].length).toBe(4);
  });
});
