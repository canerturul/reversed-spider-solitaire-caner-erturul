import { isSetCompleted } from "./select-card";

export const distributeCards = (game, setgame) => {
  const tempDecks = [...game.decks];
  const distDeck = tempDecks[10].pop();
  tempDecks.forEach((deck) => {
    if (distDeck.length > 0) {
      const distCard = distDeck.pop();
      distCard.isDown = false;
      deck.push(distCard);
    }
  });

  setgame((prevState) => ({
    ...prevState,
    decks: tempDecks,
  }));

  tempDecks.forEach((deck) => {
    isSetCompleted(deck, game, setgame);
  });
};
