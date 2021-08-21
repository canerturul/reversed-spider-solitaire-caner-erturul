import React, { useEffect } from "react";
import useCreateGame from "../hooks/useCreateGame/useCreateGame";

import Header from "../components/Header/Header";
import GameOver from "../components/GameOver/GameOver";
import CardPile from "../components/CardPile/CardPile";
import SetArea from "../components/SetArea/SetArea";
import Decks from "../components/Decks/Decks";

import "./Home.css";

export default function Home() {
  const {
    game,
    selectCard,
    moveOperations,
    moveOperationsForEmptyDeck,
    restartGame,
    distributeCards,
    undoGame,
  } = useCreateGame();

  useEffect(() => {
    const checkBestScore = () => {
      const bestScore = +localStorage.getItem("bestScore");
      const gameScore = game.score;
      if (!bestScore || bestScore < gameScore) {
        localStorage.setItem("bestScore", gameScore);
      }
    };
    checkBestScore();
  }, [game.score]);

  return (
    <div className="home">
      <Header
        game={game}
        onRestartClick={restartGame}
        onUndoGameClick={undoGame}
      />
      <div className="game-area">
        <div className="game-top">
          <CardPile game={game} distributeCards={distributeCards} />

          <SetArea game={game} />
        </div>

        <div className="game-decks">
          <Decks
            game={game}
            selectCard={selectCard}
            moveOperations={moveOperations}
            moveOperationsForEmptyDeck={moveOperationsForEmptyDeck}
          />
        </div>
      </div>
      {game.completedSetNumber === game.totalSet && (
        <GameOver score={game.score} restartGame={restartGame} />
      )}
    </div>
  );
}
