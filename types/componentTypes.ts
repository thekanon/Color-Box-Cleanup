export interface BlockProps {
  color: colorsType;
  isSelected?: boolean; // 블록이 선택되었는지 여부
  onClick?: () => void; // 블록 클릭 시 실행할 함수
}

export type colorsType =
  | "none"
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "purple"
  | "cyan"
  | "magenta"
  | "orange"
  | "gray"
  | "olive"
  | "darkgreen"
  | "steelblue"
  | "lime"
  | "pink"
  | "beige"
  | "teal";
export type gridType = BlockProps[][];
export type selectedBlockType = [number, number]; //x, y
export interface GridProps {
  grid: gridType;
  onBlockClick?: (rowIndex: number, colIndex: number) => void;
  selected: boolean;
  blockLocation: selectedBlockType;
}
