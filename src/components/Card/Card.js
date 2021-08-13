import React, { useState, useEffect } from "react";

import "./Card.css";

export default function Card({ card, isSelected, isDown }) {
  const [down, setdown] = useState("");
  const [select, setselect] = useState("");
  const symbol = "♥";
  useEffect(() => {
    if (isDown) {
      setdown(" card__down");
    } else {
      setdown(" " + card.suit);
    }
    if (isSelected) {
      setselect(" card__selected");
    } else {
      setselect("");
    }
  }, [isDown, isSelected, card.suit]);
  return (
    <div className={"card" + down + select}>
      <div className="card__content card__rank-left">{card.rank}</div>
      <div className="card__content card__suite-left">{symbol[card.suit]}</div>
      <div className="card__content card__suite-right">{symbol[card.suit]}</div>
      <div className="card__content card__rank-right">{card.rank}</div>
    </div>
  );
}
