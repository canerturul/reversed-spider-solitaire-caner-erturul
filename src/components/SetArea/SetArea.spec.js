import { render } from "@testing-library/react";
import SetArea from "./SetArea";

describe("SetAre", () => {
  const game = { totalSet: 8, completedSetNumber: 1 };

  it("render SetArea component with set-area classname", () => {
    const { container } = render(<SetArea game={game} />);

    expect(container.firstElementChild.className.includes("set-area")).toBe(
      true
    );
  });
});
