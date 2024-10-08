import { useState, useEffect } from "react";
import { timeLimit } from "@/lib/constants";

const useTimeHandle = () => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [gameOver, setGameOver] = useState<boolean>(false);

  // 게임 종료 조건
  useEffect(() => {
    if (timeLeft === 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const updateTime = (n: number) => {
    if (timeLeft + n > timeLimit) {
      setTimeLeft(timeLimit);
    } else {
      setTimeLeft((prevTime) => prevTime + n);
    }
  };

  return {
    timeLeft,
    setTimeLeft,
    updateTime,
    gameOver
  }
}

export default useTimeHandle