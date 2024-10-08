import { gridType } from "@/types/componentTypes";

export const checkForConsecutiveColors = (
  currentGrid: gridType,
  setGrid: React.Dispatch<React.SetStateAction<gridType>>,
  setScore: React.Dispatch<React.SetStateAction<number>>
) => {
  let newGrid = [...currentGrid];
  let shouldUpdate = false;
  let scoreIncrement = 0;

  for (let col = 0; col < 3; col++) {
    for (let row = 0; row < newGrid.length - 2; row++) {
      if (
        newGrid[row][col].color === newGrid[row + 1][col].color &&
        newGrid[row][col].color === newGrid[row + 2][col].color &&
        newGrid[row][col].color !== "none"
      ) {
        scoreIncrement += 3;

        newGrid[row][col] = { ...newGrid[row][col], color: "none" };
        newGrid[row + 1][col] = { ...newGrid[row + 1][col], color: "none" };
        newGrid[row + 2][col] = { ...newGrid[row + 2][col], color: "none" };
        shouldUpdate = true;
      }
    }
  }

  for (let col = 0; col < 3; col++) {
    let lastNoneIndex = -1;
    for (let row = 0; row < newGrid.length; row++) {
      if (newGrid[row][col].color === "none" && lastNoneIndex === -1) {
        lastNoneIndex = row;
      } else if (newGrid[row][col].color !== "none" && lastNoneIndex !== -1) {
        newGrid[lastNoneIndex][col].color = newGrid[row][col].color;
        newGrid[row][col].color = "none";
        lastNoneIndex++;
      }
    }
  }

  while (newGrid[newGrid.length - 1].every((block) => block.color === "none")) {
    newGrid.pop();
  }

  if (shouldUpdate) {
    setGrid(newGrid);
    setScore((prevScore) => prevScore + scoreIncrement);
  }
};
