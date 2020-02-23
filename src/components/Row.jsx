import React from "react";
import PropTypes from "prop-types";
import Cell from "./Cell";
import { createKeysArray } from "../lib/helpers";

const cells = 11;

const Row = ({ row, cellColor }) => {
  return (
    <tr>
      {createKeysArray(cells).map(key => (
        <Cell key={key} color={cellColor(row, key)} />
      ))}
    </tr>
  );
};

Row.propTypes = {
  row: PropTypes.number.isRequired,
  cellColor: PropTypes.func.isRequired
};

export default Row;
