import React, { useEffect } from "react";
import Block from "../atoms/Block";
import { GridProps } from "@/types/componentTypes";

const Grid: React.FC<GridProps> = ({
  grid,
  onBlockClick,
  blockLocation,
  selected,
}) => {
  useEffect(() => {
    console.log(blockLocation);
  }, [blockLocation]);

  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((block, colIndex) => (
            <Block
              key={colIndex}
              className={
                blockLocation &&
                blockLocation[1] === colIndex &&
                block.color === "none"
                  ? "transition-color"
                  : ""
              }
              color={block.color}
              onClick={() => onBlockClick && onBlockClick(rowIndex, colIndex)}
              isSelected={
                selected &&
                blockLocation &&
                blockLocation[0] === rowIndex &&
                blockLocation[1] === colIndex
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
