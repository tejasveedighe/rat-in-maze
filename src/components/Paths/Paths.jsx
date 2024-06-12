import { generateMaze } from "../../utils/generateMaze";
import styles from "./Paths.module.css";
import React, { useEffect, useState } from "react";

export default function Paths({ paths, n }) {
  const [mazes, setMazes] = useState([]);

  useEffect(() => {
    if (paths.length > 0) {
      let mazeList = [];

      for (let i = 0; i < paths.length; i++) {
        mazeList.push(generateMaze(n));
      }

      setMazes(mazeList);
    }
  }, [n, paths]);
  return <div className={styles.paths}>{mazes.map((maze) => "maze")}</div>;
}
