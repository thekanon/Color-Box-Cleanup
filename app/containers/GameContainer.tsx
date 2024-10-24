"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  KeyboardEvent,
} from "react";
import { BlockProps, gridType } from "@/types/componentTypes";
import Grid from "@/ui/molecules/Grid";

import { maxRows, columns, timeLimit } from "@/lib/constants";
import useGameLogic from "@/app/hooks/useGameLogic";
import useInitGame from "@/app/hooks/useInitGame";
import useTimeHandle from "@/app/hooks/useTimeHandle";

function Game() {
  const containerRef = useRef<HTMLDivElement>(null); // useRef를 생성합니다.

  const { grid, setGrid } = useInitGame(containerRef);

  const { level, levelUp, currentColors, score, setScore } =
    useGameLogic(containerRef);

  const { timeLeft, updateTime, gameOver } = useTimeHandle();

  const [cursor, setCursor] = useState<[number, number]>([0, 1]);
  const [selected, setSelected] = useState<boolean>(false);
  const [viewportHeight, setViewportHeight] = useState<number>(0);

  // 타이머 업데이트
  useEffect(() => {
    updateTime(2);

    if (score > 20 * level) {
      levelUp();
    }
  }, [score, levelUp]);

  useEffect(() => {
    if (grid.length === 0) return;
    checkForConsecutiveColors(grid);
  }, [grid]);

  const updateViewportHeight = useCallback(() => {
    setViewportHeight(window.innerHeight);
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }, []);

  useEffect(() => {
    updateViewportHeight();
    window.addEventListener("resize", updateViewportHeight);
    return () => window.removeEventListener("resize", updateViewportHeight);
  }, [updateViewportHeight]);

  const checkForConsecutiveColors = useCallback(
    (currentGrid: gridType) => {
      let newGrid = [...currentGrid];
      let shouldUpdate = false;
      let scoreIncrement = 0; // 점수 증가분을 저장할 변수

      for (let col = 0; col < columns; col++) {
        for (let row = 0; row < newGrid.length - 2; row++) {
          if (
            newGrid[row][col].color === newGrid[row + 1][col].color &&
            newGrid[row][col].color === newGrid[row + 2][col].color &&
            newGrid[row][col].color !== "none"
          ) {
            // 점수 증가 로직 추가
            scoreIncrement += 3; // 예를 들어, 블록 하나당 1점을 부여

            newGrid[row][col] = { ...newGrid[row][col], color: "none" };
            newGrid[row + 1][col] = { ...newGrid[row + 1][col], color: "none" };
            newGrid[row + 2][col] = { ...newGrid[row + 2][col], color: "none" };
            shouldUpdate = true;
          }
        }
      }

      // 열을 기준으로 "none"을 발견하면, 색상을 위로 이동
      for (let col = 0; col < columns; col++) {
        let lastNoneIndex = -1;
        for (let row = 0; row < newGrid.length; row++) {
          if (newGrid[row][col].color === "none" && lastNoneIndex === -1) {
            lastNoneIndex = row;
          } else if (
            newGrid[row][col].color !== "none" &&
            lastNoneIndex !== -1
          ) {
            newGrid[lastNoneIndex][col].color = newGrid[row][col].color;
            newGrid[row][col].color = "none";
            lastNoneIndex++;
          }
        }
      }

      // 행을 기준으로 모든 열이 none이면 행을 삭제
      while (
        newGrid[newGrid.length - 1]?.every((block) => block.color === "none")
      ) {
        newGrid.pop();
      }

      if (shouldUpdate) {
        setGrid(newGrid);
        setScore((prevScore) => prevScore + scoreIncrement); // 점수 업데이트
      }
    },
    [setGrid, setScore]
  );

  const addRow = useCallback(() => {
    if (grid.length >= maxRows) {
      console.log("게임 오버!");
      return;
    }
    updateTime(1);

    const newRow: BlockProps[] = Array.from({ length: columns }, () => ({
      color: currentColors[Math.floor(Math.random() * currentColors.length)],
    }));

    // 그리드에 새 행 추가
    const newGrid = [newRow, ...grid.slice(0, maxRows - 1)] as gridType;
    setGrid(newGrid);
    checkForConsecutiveColors(grid);
  }, [grid]); // `grid`를 의존성 배열에 포함

  const calculateCursor = useCallback(() => {
    // cursor 위치 업데이트
    if (grid.length === 0) return;
    let newCursor = grid.length - 1;
    while (newCursor >= 0 && grid[newCursor][cursor[1]].color === "none") {
      newCursor--;
    }

    if (newCursor !== cursor[0]) setCursor([newCursor, cursor[1]]);
  }, [cursor]);

  useEffect(() => {
    calculateCursor();
  }, [grid, cursor]);

  const moveBlock = (newCursor: [number, number]) => {
    const newGrid = [...grid];
    const [row, col] = cursor;
    const [newRow, newCol] = newCursor;
    // row가 -1인 경우 early return
    if (row < 0) {
      console.log("유효하지 않은 블록 위치입니다.");
      return;
    }
    const temp = newGrid[row][col];

    // 이동하려는 위치에 이미 블록이 있는지 확인
    if (newGrid[newRow][newCol].color !== "none") {
      // 현재 행에서 아래쪽으로 블록이 없는 첫 번째 위치를 찾음
      let nextAvailableRow = newRow;
      while (
        nextAvailableRow < newGrid.length - 1 &&
        newGrid[nextAvailableRow + 1][newCol].color !== "none"
      ) {
        nextAvailableRow++;
      }

      // 다음 가능한 행이 아직 현재 그리드 내에 있는 경우, 그 위치로 이동
      if (nextAvailableRow < newGrid.length - 1) {
        newGrid[nextAvailableRow + 1][newCol] = temp;
      } else {
        // 그리드의 최대 행수를 넘지 않는 경우에 새 행 추가
        if (grid.length < maxRows) {
          const newRow = Array.from({ length: columns }, () => ({
            color: "none",
          })) as BlockProps[];
          newRow[newCol] = temp;
          newGrid.push(newRow);
        } else {
          console.log("더 이상 행을 추가할 수 없습니다.");
          return; // 최대 행수를 초과하므로 이동 취소
        }
      }
    } else {
      // 위치가 비어있으면 그냥 이동
      newGrid[newRow][newCol] = temp;
    }

    // 원래 위치를 비워줌
    newGrid[row][col] = { color: "none" };

    setGrid(newGrid);
    checkForConsecutiveColors(newGrid);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    let newCursor = [...cursor] as [number, number];
    switch (event.key) {
      case "ArrowDown":
        newCursor = [newCursor[0], 1];
        setSelected((prev) => !prev);
        if (selected) moveBlock(newCursor);
        break;
      case "ArrowUp":
        addRowHandle();
        break;
      case "ArrowLeft":
        newCursor = [newCursor[0], 0];
        setSelected((prev) => !prev);
        if (selected) moveBlock(newCursor);

        break;
      case "ArrowRight":
        newCursor = [newCursor[0], 2];
        setSelected((prev) => !prev);
        if (selected) moveBlock(newCursor);

        break;
      default:
        break;
    }

    let newCursorY = grid.length - 1;
    while (newCursorY >= 0 && grid[newCursorY][newCursor[1]].color === "none") {
      newCursorY--;
    }

    setCursor([newCursorY, newCursor[1]]);
  };
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]; // 첫 번째 터치 정보를 가져옵니다.
    const { width, height } = event.currentTarget.getBoundingClientRect(); // 이벤트 타겟의 크기와 위치 정보

    const x = touch.clientX; // 터치된 x 좌표
    const y = touch.clientY; // 터치된 y 좌표

    const thirdWidth = width / 3;
    const halfHeight = height / 2;
    let newCursor = [...cursor] as [number, number];

    if (x < thirdWidth) {
      newCursor = [newCursor[0], 0];
      setSelected((prev) => !prev);
      if (selected) moveBlock(newCursor);
      console.log("left");
    } else if (x > thirdWidth * 2) {
      newCursor = [newCursor[0], 2];
      setSelected((prev) => !prev);
      if (selected) moveBlock(newCursor);
      console.log("right");
    } else {
      // 중앙 세로 1/3 구역 터치
      newCursor = [newCursor[0], 1];
      setSelected((prev) => !prev);
      if (selected) moveBlock(newCursor);
      console.log("down");
    }
    setCursor(newCursor);
  };

  const addRowHandle = () => {
    setSelected(false);
    addRow();
  };

  return (
    <div
      className="flex flex-col"
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
    >
      <div
        className="bg-blue h-6 rounded-full text-white text-left font-bold text-sm transition-all duration-300 ease-in-out overflow-hidden shadow-lg mb-2"
        style={{
          width: `${Math.min((timeLeft / timeLimit) * 100, 100)}%`,
        }}
      >
        <div
          className="w-full 
            fixed top-0 left-0 h-6 rounded-full text-white text-center font-bold text-sm"
        >
          {`Score: ${score}`}
        </div>
      </div>

      <div
        className="flex items-center h-screen flex-col justify-start"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart} // 터치 이벤트 핸들러 추가
        style={{ outline: "none" }}
        ref={containerRef} // ref를 div에 할당합니다.
      >
        {gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75">
            <div className="bg-white p-4 rounded-lg shadow-lg text-center">
              <h2 className="text-2xl font-bold text-red">아쉽네요!</h2>
              <div
                data-cb-embedded="banner-group"
                data-campaign-id="tjosvljocilv"
              ></div>
              <p className="text-lg font-bold">Final Score: {score}</p>
              <button
                className="bg-teal text-white w-full font-bold py-2 px-8 rounded-lg shadow-lg transform transition-transform hover:scale-100 active:scale-95"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Restart
              </button>
            </div>
          </div>
        )}

        <Grid selected={selected} blockLocation={cursor} grid={grid} />
      </div>
      <div className="fixed bottom-0 w-full text-center mb-4 px-4">
        <button
          className="bg-teal text-white w-full font-bold py-2 px-8 rounded-lg shadow-lg 
          active:bg-tealDark"
          onClick={addRowHandle}
        >
          Add Block
        </button>
      </div>
    </div>
  );
}

export default Game;
