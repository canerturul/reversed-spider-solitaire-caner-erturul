import { render } from "@testing-library/react";
import useCreateGame from "../hooks/useCreateGame";
import Home from "./Home";

describe("Home", () => {
  test("Render Home", () => {
    const { game, selectCard, restartGame, distributeCards, undoGame } =
      useCreateGame;
    render(<Home />);
  });
});
