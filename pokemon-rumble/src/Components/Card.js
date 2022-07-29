import React from "react";

const Card = ({ name, id, level }) => {
  return (
    <div className="grow ph4">
      <img
        alt="pokemon"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      />
      <div>
        <h2>{name}</h2>
        <h3>{`Level: ${level}`}</h3>
      </div>
    </div>
  );
};

export default Card;
