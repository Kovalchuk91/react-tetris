import React from "react";
import Row from "./Row";
import { createKeysArray } from "../lib/helpers";
import "./Board.css";

const Board = ({ cellColor }) => {
  const rows = 22;

  return (
    <div
      className="Board"
      style={{
        borderLeft: "3px solid #1B2433",
        borderTop: "3px solid #1B2433",
        borderRight: "3px solid #3C5F9E",
        borderBottom: "3px solid #3C5F9E"
      }}
    >
      <table className="Board-table">
        <tbody>
          {createKeysArray(rows).map(row => (
            <Row cellColor={cellColor} row={row} key={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
