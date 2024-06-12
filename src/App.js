// App.js
import { Suspense, useCallback, useState } from "react";
import "./App.css";
import InitialMaze from "./components/Maze/InitalMaze";
import MazeWithPath from "./components/Maze/MazeWithPath";
import { generateMaze } from "./utils/generateMaze";

function App() {
  const [n, setN] = useState(3);
  const [maze, setMaze] = useState(generateMaze(n));
  const [paths, setPaths] = useState([]);

  const handleCellClick = useCallback(
    (row, col) => {
      const newMaze = maze.map((r, rIndex) =>
        r.map((cell, cIndex) =>
          rIndex === row && cIndex === col
            ? { ...cell, selected: !cell.selected }
            : cell
        )
      );
      setMaze(newMaze);
    },
    [maze]
  );

  const handleInputChange = useCallback((e) => {
    const newN = parseInt(e.target.value, 10);
    setN(newN);
    setMaze(generateMaze(newN));
    setPaths([]); // Reset paths when the maze size changes
  }, []);

  const findPathHelper = useCallback(
    (currentRow, currentCol, path, visited, n, foundPaths) => {
      // Base case: if we reached the end (n-1, n-1)
      if (currentRow === n - 1 && currentCol === n - 1) {
        foundPaths.push([...path, { row: currentRow, col: currentCol }]);
        return;
      }

      // Mark the current cell as visited
      visited[currentRow][currentCol] = true;
      path.push({ row: currentRow, col: currentCol });

      // Possible directions: down, left, right, up
      const directions = [
        { row: 1, col: 0 }, // Down
        { row: 0, col: -1 }, // Left
        { row: 0, col: 1 }, // Right
        { row: -1, col: 0 }, // Up
      ];

      for (let { row, col } of directions) {
        const nextRow = currentRow + row;
        const nextCol = currentCol + col;

        // Check boundaries and whether the cell is already visited
        if (
          nextRow >= 0 &&
          nextCol >= 0 &&
          nextRow < n &&
          nextCol < n &&
          !visited[nextRow][nextCol] &&
          !maze[nextRow][nextCol].selected
        ) {
          findPathHelper(nextRow, nextCol, path, visited, n, foundPaths);
        }
      }

      // Backtrack: Unmark the current cell as visited and remove it from the path
      visited[currentRow][currentCol] = false;
      path.pop();
    },
    [maze]
  );

  const findPath = useCallback(() => {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const foundPaths = [];
    findPathHelper(0, 0, [], visited, n, foundPaths);
    setPaths(foundPaths);
  }, [findPathHelper, n]);

  return (
    <div className="d-flex align-items-center justify-content-center canvas flex-column">
      <p>Inital Maze:</p>
      <InitialMaze
        n={n}
        handleCellClick={handleCellClick}
        handleInputChange={handleInputChange}
        maze={maze}
        paths={paths} // Pass the found paths to the Maze component
      />
      <button className="btn btn-primary" onClick={findPath}>
        Find Paths
      </button>
      <Suspense fallback={<p className="text-center">Loading....</p>}>
        <div className="d-flex align-items-center justify-content-center flex-wrap gap-3 my-5">
          {paths.length > 0 &&
            paths.map((path) => {
              return (
                <MazeWithPath
                  key={crypto.randomUUID()}
                  maze={maze}
                  n={n}
                  path={path}
                />
              );
            })}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
