import shuffle from "shuffle-array";

export const prepareCards = () => {
  let cards = [];
  let decks;
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

  ranks.forEach((rank) => {
    for (let i = 1; i < 9; i++) {
      cards.push({
        rank: rank,
        suit: "heart",
        isDown: true,
        deck: i,
        isSelected: false,
      });
    }
  });

  let shuffledCards = shuffle(cards);
  let distCards;
  decks = chunk(shuffledCards.slice(0, 24), 6);
  decks = decks.concat(chunk(shuffledCards.slice(24, 54), 5));
  distCards = chunk(shuffledCards.slice(54), 10);
  decks[10] = [...distCards];
  for (let i = 0; i <= 9; i++) {
    decks[i][decks[i].length - 1].isDown = false;
  }
  return {
    decks: decks,
    cards: shuffledCards,
  };
};

const chunk = (arr, chunkSize) => {
  if (chunkSize <= 0) {
    throw "Invalid chunk size";
  }
  var chunk = [];
  for (var i = 0, len = arr.length; i < len; i += chunkSize)
    chunk.push(arr.slice(i, i + chunkSize));
  return chunk;
};
