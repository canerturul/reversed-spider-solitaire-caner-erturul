function getCardRank(rank) {
  switch (rank) {
    case "K":
      return 13;
    case "Q":
      return 12;
    case "J":
      return 11;
    case "A":
      return 1;
    default:
      return parseInt(rank);
  }
}

export const selectCard = (card, deck, holder, game, setgame) => {
  const tempCard = card;

  if (game.selectedCard === "") {
    if (isMovable(card, deck)) {
      tempCard.isSelected = true;
      var tempDeck = [...deck];
      var selected = tempDeck.slice(deck.indexOf(card));
      selected.forEach((curCard) => {
        curCard.isSelected = true;
      });
      setgame((prevState) => ({
        ...prevState,
        selected: selected,
        selectedCard: card,
        selectedDeck: deck,
      }));
    }
  } else {
    if (checkMove(tempCard, deck, game)) {
      moveCards(deck, game.selectedDeck, game.selectedCard, setgame, game);
      isSetCompleted(deck, game, setgame);
      removeSelect(game, setgame);
    } else {
      removeSelect(game, setgame);
    }
  }
};

const isMovable = (card, deck) => {
  const tempDeck = [...deck];
  const movingCards = tempDeck.slice(deck.indexOf(card));
  const ranks = movingCards.map((card) => {
    return getCardRank(card.rank);
  });
  var currRank = getCardRank(card.rank);
  for (let i = 1; i < ranks.length; i++) {
    if (ranks[i] - currRank !== 1) {
      return false;
    }

    currRank = ranks[i];
  }
  return true;
};

const checkMove = (target, deck, game) => {
  if (getCardRank(game.selectedCard.rank) - getCardRank(target.rank) === 1) {
    if (deck.indexOf(target) === deck.length - 1) {
      return true;
    }
  }
  return false;
};

const moveCards = (
  targetDeck,
  sourceDeck,
  selectedCardInSource,
  setgame,
  game
) => {
  try {
    const tempDeck = [...game.decks];
    const targetIndex = tempDeck.indexOf(targetDeck);
    const sourceIndex = tempDeck.indexOf(sourceDeck);
    const selectedCardIndex =
      tempDeck[sourceIndex].indexOf(selectedCardInSource);

    var movedCards = tempDeck[sourceIndex].splice(selectedCardIndex);
    movedCards.forEach((card) => {
      tempDeck[targetIndex].push(card);
    });

    if (
      tempDeck[sourceIndex][tempDeck[sourceIndex].length - 1].isDown === true
    ) {
      tempDeck[sourceIndex][tempDeck[sourceIndex].length - 1].isDown = false;
    }

    setgame((prevState) => ({
      ...prevState,
      decks: tempDeck,
    }));
  } catch (error) {
    console.log(error);
  }
};

const removeSelect = (game, setgame) => {
  if (game.selectedCard !== "") {
    const newDecks = [...game.decks];
    let i = 0;
    let j = 0;
    while (i < newDecks.length) {
      j = 0;
      while (j < newDecks[i].length) {
        newDecks[i][j].isSelected = false;
        j++;
      }
      i++;
    }
    setgame((prevState) => ({
      ...prevState,
      selected: [],
      decks: newDecks,
      selectedCard: "",
      selectedDeck: "",
    }));
  }
};

// check deck array and if deck has a set return booelan value
const checkDeckHasSet = (deck) => {
  var ranks = deck.map((card) => {
    return getCardRank(card.rank);
  });
  const expectedSetArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  if (JSON.stringify(expectedSetArray) === JSON.stringify(ranks.slice(-13))) {
    return true;
  }

  return false;
};

const isSetCompleted = (deck, game, setgame) => {
  const isHasSet = checkDeckHasSet(deck);

  if (isHasSet) {
    const newDeckLen = deck.length - 13;
    let tempDecks = [...game.decks];
    const indexDeck = tempDecks.indexOf(deck);
    tempDecks[indexDeck].splice(newDeckLen);

    var completedSetNumber = game.completedSetNumber;
    if (tempDecks[indexDeck].length !== 0) {
      tempDecks[indexDeck][tempDecks[indexDeck].length - 1].isDown = false;
    }
    setgame((prevState) => ({
      ...prevState,
      decks: tempDecks,
      completedSetNumber: completedSetNumber + 1,
    }));
  }

  if (completedSetNumber + 1 === game.totalSet) {
    console.log("Game Over");
  }
};
