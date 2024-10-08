import { useState, useEffect, useCallback, KeyboardEvent } from "react";
import { BlockProps, gridType, colorsType } from "@/types/componentTypes";
import { colors, maxRows, columns, timeLimit, firstGrid } from "@/lib/constants";
import { checkForConsecutiveColors } from "@/lib/utils";

const useInitGame = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const [grid, setGrid] = useState<gridType>([]);

  // 초기 그리드 설정 및 키보드 포커스 설정
  useEffect(() => {
    setGrid(firstGrid as gridType);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  return {
    grid,
    setGrid,
  };
};

export default useInitGame;
