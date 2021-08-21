import { render, screen } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer", () => {
  const time = { minute: "01", second: "20" };

  test("render Timer component with timer classname", () => {
    const { container } = render(<Timer time={time} />);
    expect(container.firstElementChild.className.includes("timer")).toBe(true);
  });

  test("render minute correctly", () => {
    render(<Timer time={time} />);
    const element = screen.getByTestId("minute-span");
    expect(element.textContent).toBe("01");
  });

  test("render second correctly", () => {
    render(<Timer time={time} />);
    const element = screen.getByTestId("second-span");
    expect(element.textContent).toBe("20");
  });
});
