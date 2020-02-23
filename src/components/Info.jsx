import React from "react";

import "./Info.css";

const Info = ({ title, info }) => {
  return (
    <div className="Info">
      <h3 className="Info-heading">{title}</h3>
      <div className="Info-block">{info}</div>
    </div>
  );
};

export default Info;
