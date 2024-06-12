import classNames from "classnames";
import styles from "./Cell.module.css";

export default function Cell(props) {
  return (
    <div
      className={classNames(
        styles.cell,
        props.selected ? styles.selected : "",
        props.first ? styles.first : "",
        props.end ? styles.end : "",
        props.isPath ? styles.path : ""
      )}
      onClick={!props.first && !props.end ? props.onCellClick : () => {}}
    ></div>
  );
}
