import React from "react";
import Cell from "../Cell/Cell";
import styles from "./Maze.module.css";

export default function InitialMaze({
  n,
  maze,
  handleInputChange,
  handleCellClick,
}) {
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
        />
      </div>
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
              key={`${rowIndex}-${colIndex}`}
              onCellClick={() => handleCellClick(rowIndex, colIndex)}
              first={rowIndex === 0 && colIndex === 0}
              end={rowIndex === n - 1 && colIndex === n - 1}
            />
          ))
        )}
      </div>
    </div>
  );
}
