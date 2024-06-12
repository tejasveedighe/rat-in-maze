// Generates the initial maze grid with all cells unselected
export const generateMaze = (n) => {
  return Array.from({ length: n }, () => Array.from({ length: n }, () => ({ selected: false }))
  );
};
