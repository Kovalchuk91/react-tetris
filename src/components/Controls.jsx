import React, { useState } from "react";
import "./Controls.css";

const Controls = ({ up, left, right, down }) => {
  const [timer, setTimer] = useState(null);

  const onHold = (callable, time) => setTimer(setInterval(callable, time));

  const onRelease = () => clearInterval(timer);

  return (
    <div className="Controls">
      <button
        type="button"
        onClick={left}
        onMouseDown={() => onHold(left, 200)}
        onTouchStart={() => onHold(left, 200)}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchEnd={onRelease}
      >
        <span className="ControlsIcon icon-arrow-long-left" />
      </button>
      <button type="button" onClick={up}>
        <span className="ControlsIcon icon-cycle" />
      </button>
      <button
        type="button"
        onClick={down}
        onMouseDown={() => onHold(down, 100)}
        onTouchStart={() => onHold(down, 200)}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchEnd={onRelease}
      >
        <span className="ControlsIcon icon-arrow-long-down" />
      </button>
      <button
        type="button"
        onClick={right}
        onMouseDown={() => onHold(right, 200)}
        onTouchStart={() => onHold(right, 200)}
        onMouseUp={onRelease}
        onMouseLeave={onRelease}
        onTouchEnd={onRelease}
      >
        <span className="ControlsIcon icon-arrow-long-right" />
      </button>
    </div>
  );
};

export default Controls;
