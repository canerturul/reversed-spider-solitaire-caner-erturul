import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";
import icon from "../../assets/icons/undo.ico";

describe("Button", () => {
  const handleClick = jest.fn();
  it("render Button component with classname", () => {
    const { container } = render(
      <Button buttonClick={handleClick} buttonText="Click" icon={icon} />
    );

    expect(
      container.firstElementChild.className.includes("btn header-element")
    ).toBe(true);
  });

  it("calls handleClick prop when clicked", () => {
    render(<Button buttonClick={handleClick} buttonText="Click" icon={icon} />);

    fireEvent.click(screen.getByText(/Click/));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("render Button component with correct button text", () => {
    const { getAllByText } = render(
      <Button buttonClick={handleClick} buttonText="Click" icon={icon} />
    );

    expect(getAllByText("Click")).toBeTruthy();
  });
});
