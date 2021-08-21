import { render } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  const game = { point: 0 };
  const restartClick = jest.fn();
  const undoClick = jest.fn();

  it("render Header component header classname", () => {
    const { container } = render(
      <Header
        game={game}
        onRestartClick={restartClick}
        onUndoGameClick={undoClick}
      />
    );
    expect(container.firstElementChild.className.includes("header")).toBe(true);
  });

  it("Header title", () => {
    const { getByText } = render(
      <Header
        game={game}
        onRestartClick={restartClick}
        onUndoGameClick={undoClick}
      />
    );
    expect(getByText("Spider Solitaire")).toBeInTheDocument();
  });
});
