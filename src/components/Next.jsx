import React from "react";

import { createKeysArray } from "../lib/helpers";
import Cell from "./Cell";
import "./Next.css";

const Next = ({ figure, color }) => {
  const width = figure.getWidth(0);
  const height = figure.getWidth(1);

  const cellIsFilled = (row, cell) => {
    return figure
      .getAllCells(0, 0, 0)
      .some(([x, y]) => x === cell && row === y);
  };

  return (
    <div>
      <h3 className="Next-heading">Next</h3>
      <div className="Next-block">
        <table className="Next-table">
          <tbody>
            {createKeysArray(height).map(row => (
              <tr key={row}>
                {createKeysArray(width).map(cell => (
                  <Cell
                    color={cellIsFilled(row, cell) ? color : null}
                    transparent
                    key={cell}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Next;
