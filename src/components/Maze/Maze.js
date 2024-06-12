import { useState } from "react";
import Cell from "../Cell/Cell";
import styles from "./Maze.module.css";

const generateMaze = (n) => {
  let maze = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < n; j++) {
      row.push({
        selected: false,
      });
    }
    maze.push(row);
  }
  return maze;
};

export default function Maze() {
  const [n, setN] = useState(3);
  const [maze, setMaze] = useState(generateMaze(n));

  const handleCellClick = (row, col) => {
    const newMaze = maze.map((r, rIndex) => {
      return r.map((c, cIndex) => {
        if (row === rIndex && col === cIndex) {
          c.selected = c.selected ? false : true;
          return c;
        } else {
          return c;
        }
      });
    });

    setMaze((prev) => (prev = newMaze));
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    let newN = parseInt(e.target.value, 10);
    setN(newN);
    setMaze(generateMaze(newN));
  };

  const findPathHelper = (
    currentRowIndex,
    currentColIndex,
    n,
    ans,
    currentPath,
    visited
  ) => {
    // base case
    if (currentRowIndex === n - 1 && currentColIndex === n - 1) {
      ans.push(currentPath);
      return;
    }

    //down
    if (
      currentRowIndex + 1 < n &&
      maze[currentRowIndex + 1][currentColIndex] &&
      !visited[currentRowIndex + 1][currentColIndex]
    ) {
      visited[currentRowIndex + 1][currentColIndex] = 1;
      currentPath.row.push(currentRowIndex + 1);
      findPathHelper(
        currentRowIndex + 1,
        currentColIndex,
        n,
        ans,
        currentPath,
        visited
      );
      visited[currentRowIndex + 1][currentColIndex] = 0;
    }

    // left
    if (
      currentColIndex - 1 >= 0 &&
      maze[currentRowIndex][currentColIndex - 1] &&
      !visited[currentRowIndex][currentColIndex - 1]
    ) {
      visited[currentRowIndex][currentColIndex - 1] = 1;
      currentPath.col.push(currentColIndex - 1);
      findPathHelper(
        currentRowIndex,
        currentColIndex - 1,
        n,
        ans,
        currentPath,
        visited
      );
      visited[currentRowIndex][currentColIndex - 1] = 0;
    }

    //right
    if (
      currentColIndex + 1 < n &&
      maze[currentRowIndex][currentColIndex + 1] &&
      !visited[currentRowIndex][currentColIndex + 1]
    ) {
      visited[currentRowIndex][currentColIndex + 1] = 1;
      currentPath.col.push(currentColIndex + 1);
      findPathHelper(
        currentRowIndex,
        currentColIndex + 1,
        n,
        ans,
        currentPath,
        visited
      );
      visited[currentRowIndex][currentColIndex + 1] = 0;
    }

    //upward
    if (
      currentRowIndex - 1 <= 0 &&
      maze[currentRowIndex - 1][currentColIndex] &&
      !visited[currentRowIndex - 1][currentColIndex]
    ) {
      visited[currentRowIndex - 1][currentColIndex] = 1;
      currentPath.row.push(currentColIndex - 1);
      findPathHelper(
        currentRowIndex - 1,
        currentColIndex,
        n,
        ans,
        currentPath,
        visited
      );
      visited[currentRowIndex - 1][currentColIndex] = 0;
    }
  };

  const findPath = () => {
    let currentPath = { row: [], col: [] };
    let visited = new Array(n).fill(new Array(n).fill(0));
    let ans = [];
    debugger;
    findPathHelper(0, 0, n, ans, currentPath, visited);

    console.log(ans);
  };

  return (
    <div className={styles.mazeContainer}>
      <div className="form-group mb-5">
        <label className="form-label">Enter Maze size (N*N): </label>
        <input
          className="form-control"
          type="number"
          max={5}
          min={2}
          onChange={handleInputChange}
          value={n}
        ></input>
      </div>
      <div
        className={styles.maze}
        style={{
          gridTemplateRows: `repeat(${n}, 1fr)`,
          gridTemplateColumns: `repeat(${n}, 1fr)`,
        }}
      >
        {maze.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Cell
              selected={col.selected}
              key={crypto.randomUUID()}
              onCellClick={() => handleCellClick(rowIndex, colIndex)}
              first={!rowIndex && !colIndex}
              end={rowIndex === n - 1 && colIndex === n - 1}
            />
          ))
        )}
      </div>
      <button className="btn btn-primary" onClick={findPath}>
        Find Paths
      </button>
    </div>
  );
}
