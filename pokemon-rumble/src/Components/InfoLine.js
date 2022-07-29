import React from "react";

const InfoLine = ({ name, value }) => {
  return (
    <div className="flex justify-between ph2 grow">
      <h4 className="pv2 ph4 ma0 ">{`${name}: `}</h4>
      <p className="pv2 ph4 ma0">{value}</p>
    </div>
  );
};

export default InfoLine;
