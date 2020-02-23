import React from "react";
import Color from "color";
import { PropTypes } from "prop-types";
import { memoize } from "../lib/helpers";
import "./Cell.css";

const Cell = ({ color, transparent }) => {
  let style = {};

  if (color) {
    const lighterColor = memoize(color => {
      return Color(color)
        .lighten(0.2)
        .hex();
    })(color);

    const darkerColor = memoize(color => {
      return Color(color)
        .darken(0.2)
        .hex();
    })(color);

    style = {
      backgroundColor: color,
      borderTopColor: lighterColor,
      borderLeftColor: lighterColor,
      borderRightColor: darkerColor,
      borderBottomColor: darkerColor,
      borderStyle: "solid"
    };
  } else if (transparent) {
    style = {
      backgroundColor: "transparent"
    };
  } else {
    style = {
      backgroundColor: "#303030"
    };
  }

  return (
    <td
      className="Cell"
      style={{
        borderStyle: transparent ? "hidden" : "solid"
      }}
    >
      <div className="Cell-cube" style={style} />
    </td>
  );
};

Cell.propTypes = {
  color: PropTypes.string.isRequired,
  transparent: PropTypes.bool.isRequired
};

export default Cell;
