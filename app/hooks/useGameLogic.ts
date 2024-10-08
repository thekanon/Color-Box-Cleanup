import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { BlockProps, gridType, colorsType } from "@/types/componentTypes";
import { colors, maxRows, columns, timeLimit, firstGrid } from "@/lib/constants";
import { checkForConsecutiveColors } from "@/lib/utils";

const useGameLogic = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [grid, setGrid] = useState<gridType>([]);
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  // 타이머
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  // 레벨업 기능
  const levelUp = useCallback(() => {
    console.log("Level Up!");
    setLevel((prevLevel) => prevLevel + 1);
  }, [setLevel]);

  // 레벨 별로 색상을 변경할 수 있도록 `currentColors` 상태 추가
  const [currentColors, setCurrentColors] = useState<colorsType[]>(
    colors.slice(0, level + 2) as colorsType[]
  );

  // 레벨이 변경될 때마다 현재 색상을 업데이트
  useEffect(() => {
    setCurrentColors(colors.slice(0, level + 2) as colorsType[]);
  }, [level]);



  return {
    level,
    levelUp,
    currentColors,
    score,
    setScore
  };
};

export default useGameLogic;
