import React from "react";

import { times } from "lodash";
import PropTypes from "prop-types";

import Card from "../Card/Card";
import EmptyDeck from "../EmptyDeck/EmptyDeck";

import "./SetArea.css";

function SetArea({ game }) {
  return (
    <div className="set-area">
      {times(game.totalSet, (index) => {
        return index < game.completedSetNumber ? (
          <Card
            key={index}
            card={{ rank: "A", suit: "heart" }}
            isSelected={false}
            isDown={false}
          />
        ) : (
          <EmptyDeck key={index} />
        );
      })}
    </div>
  );
}

SetArea.propTypes = {
  game: PropTypes.object,
};
export default SetArea;
