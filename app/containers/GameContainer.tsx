"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  KeyboardEvent,
} from "react";
import { BlockProps, colorsType, gridType } from "@/types/componentTypes";
import Grid from "@/ui/molecules/Grid";

const colors: colorsType[] = ["red", "green", "blue"];
const maxRows: number = 12;
const columns: number = 3;
const firstRow: BlockProps[] = Array.from({ length: columns }, () => ({
  color: colors[Math.floor(Math.random() * colors.length)],
}));

function Game() {
  const containerRef = useRef<HTMLDivElement>(null); // useRef를 생성합니다.

  const [grid, setGrid] = useState<gridType>([]);
  // 레벨 별로 색상을 변경할 수 있도록 `currentColors` 상태 추가
  const [currentColors, setCurrentColors] = useState<colorsType[]>(colors);
  const [level, setLevel] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [cursor, setCursor] = useState<[number, number]>([0, 1]);
  const [selected, setSelected] = useState<boolean>(false);

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
        newGrid[newGrid.length - 1].every((block) => block.color === "none")
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

    const newRow: BlockProps[] = Array.from({ length: columns }, () => ({
      color: currentColors[Math.floor(Math.random() * currentColors.length)],
    }));

    // 그리드에 새 행 추가
    const newGrid = [newRow, ...grid.slice(0, maxRows - 1)] as gridType;
    setGrid(newGrid);
    console.log("addRow");
    checkForConsecutiveColors(grid);
  }, [grid]); // `grid`를 의존성 배열에 포함

  const calculateCursor = useCallback(() => {
    // cursor 위치 업데이트
    if (grid.length === 0) return;
    let newCursor = grid.length - 1;
    while (newCursor >= 0 && grid[newCursor][cursor[1]].color === "none") {
      newCursor--;
    }

    console.log("newCursor", [newCursor, cursor[1]]);
    if (newCursor !== cursor[0]) setCursor([newCursor, cursor[1]]);
  }, [cursor]);

  useEffect(() => {
    setGrid([firstRow]);
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    calculateCursor();
  }, [grid, cursor]);

  useEffect(() => {
    const interval = setInterval(() => {
      addRow();
    }, 300000);

    return () => clearInterval(interval);
  }, [addRow]); // `addRow`가 변경될 때마다 인터벌 재설정

  const moveBlock = (newCursor: [number, number]) => {
    const newGrid = [...grid];
    const [row, col] = cursor;
    const [newRow, newCol] = newCursor;
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
        addRow();
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
    setCursor(newCursor);
  };
  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]; // 첫 번째 터치 정보를 가져옵니다.
    const { width, height } = event.currentTarget.getBoundingClientRect(); // 이벤트 타겟의 크기와 위치 정보

    const x = touch.clientX; // 터치된 x 좌표
    const y = touch.clientY; // 터치된 y 좌표

    const thirdWidth = width / 3;
    const halfHeight = height / 2;
    let newCursor = [...cursor] as [number, number];

    if (y < halfHeight) {
      // 상단 가로 1/2 구역 터치
      console.log("addRow");
      addRow(); // 새로운 행 추가
      return;
    }

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

  return (
    <div
      className="flex items-center h-screen flex-col justify-start"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart} // 터치 이벤트 핸들러 추가
      style={{ outline: "none" }}
      ref={containerRef} // ref를 div에 할당합니다.
    >
      <Grid selected={selected} blockLocation={cursor} grid={grid} />
      {`score: ${score}`}
    </div>
  );
}

export default Game;
