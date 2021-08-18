import { useEffect, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState({
    second: "00",
    minute: "00",
    counter: 0,
  });

  const resetTimer = () => {
    setTime(() => ({
      second: "00",
      minute: "00",
      counter: 0,
    }));
  };

  useEffect(() => {
    let intervalId;

    intervalId = setInterval(() => {
      const secondCounter = time.counter % 60;

      const minuteCounter = Math.floor(time.counter / 60);

      const computedSecond =
        String(secondCounter).length === 1
          ? `0${secondCounter}`
          : secondCounter;
      const computedMinute =
        String(minuteCounter).length === 1
          ? `0${minuteCounter}`
          : minuteCounter;

      setTime((prevState) => ({
        second: computedSecond,
        minute: computedMinute,
        counter: prevState.counter + 1,
      }));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time.counter]);

  return { time, resetTimer };
};
export default useTimer;
