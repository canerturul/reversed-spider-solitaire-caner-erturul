import { useState, useEffect, useCallback } from "react";
import * as _ from "lodash";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useCreateGame() {
  const initialState = {
    cards: [],
    decks: [],
    selected: [],
    selectedDeck: [],
    selectedCard: "",
    completedSets: [],
    completedSetNumber: 0,
    totalSet: 8,
    score: 0,
  };
  const [game, setGame] = useState(initialState);
  const [undo, setUndo] = useState({});

  const restartGame = () => {
    setGame(initialState);
    setUndo({});
    createGame();
  };

  const prepareCards = useCallback(() => {
    let cards = [];
    const ranks = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];

    //Creation of 8 card decks
    ranks.forEach((rank) => {
      _.times(game.totalSet, (i) => {
        cards.push({
          rank: rank,
          suit: "heart",
          isDown: true,
          deck: i,
          isSelected: false,
        });
      });
    });

    //shuffling and chunking cards
    let shuffledCards = _.shuffle(cards);

    const firstDeckSize = 6;
    const firstDeck = _.chunk(shuffledCards.slice(0, 24), firstDeckSize);

    const secondDeckSize = 5;
    const secondDeck = _.chunk(shuffledCards.slice(24, 54), secondDeckSize);

    const pileSize = 10;
    const cardPile = _.chunk(shuffledCards.slice(54), pileSize);

    const totalDeckSize = firstDeckSize + secondDeckSize;

    const mergedDecks = [...firstDeck, ...secondDeck];
    mergedDecks[totalDeckSize - 1] = [...cardPile];

    mergedDecks.forEach((deck) => {
      deck[deck.length - 1].isDown = false;
    });

    return {
      decks: mergedDecks,
      cards: shuffledCards,
    };
  }, [game.totalSet]);

  //prepare cards and set initial game state

  const createGame = useCallback(() => {
    const initVal = prepareCards();
    setGame((prevState) => ({
      ...prevState,
      cards: initVal.cards,
      decks: initVal.decks,
    }));
  }, [prepareCards]);

  useEffect(() => {
    createGame();
  }, [createGame]);

  //move notify
  const moveNotify = () =>
    toast.error("You can not move here!", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 3000,
    });

  //return card ranks
  const getCardRank = (rank) => {
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
  };

  //check of selected card status and card selection
  const selectCard = (card, deck, emptyArea) => {
    const tempCard = card;

    if (emptyArea && game.selectedCard) {
      moveCards(deck, game.selectedDeck, game.selectedCard);
      removeSelect();
      return;
    }

    if (!game.selectedCard) {
      if (emptyArea) {
        return;
      }

      if (isMovable(card, deck)) {
        var tempDeck = [...deck];

        const prevGameDecks = _.cloneDeep(game.decks);

        var selectedCards = tempDeck.slice(deck.indexOf(card));
        selectedCards.forEach((curCard) => {
          curCard.isSelected = true;
        });

        setUndo({
          decks: [...prevGameDecks],
          selected: [],
          selectedDeck: [],
          selectedCard: "",
          completedSets: [],
          totalSet: 8,
          completedSetNumber: game.completedSetNumber,
          score: game.score,
        });
        console.log(card);
        setGame((prevState) => ({
          ...prevState,
          selected: selectedCards,
          selectedCard: card,
          selectedDeck: deck,
        }));
      }
    } else {
      if (checkMove(tempCard, deck)) {
        moveCards(deck, game.selectedDeck, game.selectedCard);
        checkSetCompleted(deck);
        removeSelect();
      } else {
        if (!emptyArea) {
          moveNotify();
        }
        removeSelect();
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

  const checkMove = (target, deck) => {
    if (getCardRank(game.selectedCard.rank) - getCardRank(target.rank) === 1) {
      if (deck.indexOf(target) === deck.length - 1) {
        return true;
      } else {
        moveNotify();
      }
    }

    return false;
  };
  //Move card to the selected deck
  const moveCards = (toDeck) => {
    try {
      const tempDeck = [...game.decks];

      const fromDeck = game.selectedDeck;
      const selectedCard = game.selectedCard;

      const toDeckIndex = tempDeck.indexOf(toDeck);
      const fromDeckIndex = tempDeck.indexOf(fromDeck);
      const selectedCardIndex = tempDeck[fromDeckIndex].indexOf(selectedCard);

      var movedCards = tempDeck[fromDeckIndex].splice(selectedCardIndex);
      movedCards.forEach((card) => {
        tempDeck[toDeckIndex].push(card);
      });

      if (
        tempDeck[fromDeckIndex].length > 0 &&
        tempDeck[fromDeckIndex][tempDeck[fromDeckIndex].length - 1].isDown ===
          true
      ) {
        tempDeck[fromDeckIndex][
          tempDeck[fromDeckIndex].length - 1
        ].isDown = false;
      }

      setGame((prevState) => ({
        ...prevState,
        decks: tempDeck,
        score: game.score + 10,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // 1 step undo game
  const undoGame = () => {
    if (!_.isEmpty(undo)) {
      setGame((prevState) => ({
        ...prevState,
        ...undo,
      }));
    }
  };

  //remove selection all cards
  const removeSelect = () => {
    if (game.selectedCard !== "") {
      const tempDecks = [...game.decks];

      let i = 0;
      let j = 0;
      while (i < tempDecks.length) {
        j = 0;
        while (j < tempDecks[i].length) {
          tempDecks[i][j].isSelected = false;
          j++;
        }
        i++;
      }

      setGame((prevState) => ({
        ...prevState,
        selected: [],
        decks: tempDecks,
        selectedCard: "",
        selectedDeck: "",
      }));
    }
  };

  // distribute 10 cards from card pile
  const distributeCards = () => {
    const tempDecks = [...game.decks];
    const distDeck = tempDecks[10].pop();

    tempDecks.forEach((deck) => {
      if (distDeck.length > 0) {
        const distCard = distDeck.pop();
        distCard.isDown = false;
        deck.push(distCard);
      }
    });

    setGame((prevState) => ({
      ...prevState,
      decks: tempDecks,
    }));
    removeSelect(game, setGame);
    tempDecks.forEach((deck) => {
      checkSetCompleted(deck);
    });
  };

  const checkIsDown = (card) => card.isDown === false;

  // check deck array and if deck has a set return booelan value
  const checkDeckHasSet = (deck) => {
    var ranks = deck.map((card) => {
      return getCardRank(card.rank);
    });

    const expectedSetArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    if (JSON.stringify(expectedSetArray) === JSON.stringify(ranks.slice(-13))) {
      let tempDeck = [...deck];

      const checkAllCardDown = tempDeck.slice(-13).every(checkIsDown);

      return checkAllCardDown;
    }

    return false;
  };

  //card set completion check on every card move
  const checkSetCompleted = (deck) => {
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

      setGame((prevState) => ({
        ...prevState,
        decks: tempDecks,
        completedSetNumber: completedSetNumber + 1,
        score: game.score + 100,
      }));
    }

    if (completedSetNumber + 1 === game.totalSet) {
      setGame((prevState) => ({
        ...prevState,
        score: game.score + 200,
      }));

      console.log("Game Over");
    }
  };

  return {
    game,
    selectCard,
    restartGame,
    distributeCards,
    undoGame,
  };
}
