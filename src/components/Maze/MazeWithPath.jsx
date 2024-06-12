import React from "react";
import Cell from "../Cell/Cell";
import styles from "./Maze.module.css";

export default function MazeWithPath({ n, maze, path }) {
  const isPathCell = (row, col) => {
    return path.some((p) => p.row === row && p.col === col);
  };

  return (
    <div className={styles.mazeContainer}>
      <div
        className={styles.maze}
        style={{
          gridTemplateRows: `repeat(${n}, 1fr)`, // Dynamic rows
          gridTemplateColumns: `repeat(${n}, 1fr)`, // Dynamic columns
        }}
      >
        {maze.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              selected={cell.selected}
              isPath={isPathCell(rowIndex, colIndex)}
              key={`${rowIndex}-${colIndex}`}
              first={rowIndex === 0 && colIndex === 0}
              end={rowIndex === n - 1 && colIndex === n - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
