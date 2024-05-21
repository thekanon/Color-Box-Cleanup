import React from "react";
import Block from "../atoms/Block";
import { GridProps } from "@/types/componentTypes";

const Grid: React.FC<GridProps> = ({
  grid,
  onBlockClick,
  blockLocation,
  selected,
}) => {
  return (
    <div>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((block, colIndex) => (
            <Block
              key={colIndex}
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
