import { renderHook, act } from "@testing-library/react-hooks";
import useTimer from "./useTimer";

describe("Timer Hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("should use timer", () => {
    const { result } = renderHook(() => useTimer());
    expect(result.current.time.second).toBe("00");
    expect(result.current.time.minute).toBe("00");
    expect(result.current.time.counter).toBe(0);
    expect(typeof result.current.resetTimer).toBe("function");
  });

  it("should be counters value 12 after 12 seconds", async () => {
    const { result } = renderHook(() => useTimer());

    expect(result.current.time.counter).toBe(0);

    act(() => {
      jest.advanceTimersByTime(12000);
    });

    expect(result.current.time.counter).toBe(12);
  });

  it("should reset counter value", async () => {
    const { result } = renderHook(() => useTimer());
    const { resetTimer } = result.current;

    act(() => {
      jest.advanceTimersByTime(12000);
    });

    expect(result.current.time.counter).toBe(12);

    act(() => {
      resetTimer();
    });

    expect(result.current.time.counter).toBe(0);
  });

  it("should be minutes value 2", async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useTimer());

    expect(result.current.time.counter).toBe(0);

    act(() => {
      jest.advanceTimersByTime(121000);
    });

    expect(result.current.time.minute).toBe("02");
  });
});
