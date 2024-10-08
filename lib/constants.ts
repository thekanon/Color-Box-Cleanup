// constants.ts
export const colors: string[] = [
  "red",
  "green",
  "blue",
  "yellow",
  "purple",
  "cyan",
  "magenta",
  "orange",
  "gray",
  "olive",
  "pink",
];
export const maxRows: number = 14;
export const columns: number = 3;
export const timeLimit: number = 10;
export const firstGrid = Array.from({ length: 7 }, () =>
  Array.from({ length: columns }, () => ({
    color: colors[Math.floor(Math.random() * 3)],
  }))
);
