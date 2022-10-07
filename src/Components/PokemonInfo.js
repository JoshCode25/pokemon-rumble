import React from "react";
import Card from "./Card";
import InfoLine from "./InfoLine";
import MoveInfo from "./MoveInfo";

const PokemonInfo = ({ pokemon }) => {
  return (
    <div className="flex justify-center items-center tc bg-light-green br3 pa4 ma1 dib bw2 shadow-5">
      <Card name={pokemon.name} id={pokemon.id} level={pokemon.level} />
      <div>
        {pokemon.currentStats.map((stat, i) => {
          return (
            <InfoLine
              key={`${stat.name}${i}`}
              name={stat.name}
              value={stat.value}
            />
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center">
        {pokemon.currentMovesList.map((move, i) => {
          return (
            <MoveInfo
              key={`${move.name}${i}`}
              name={move.name}
              type={move.type}
              power={move.power}
              accuracy={move.accuracy}
              levelLearnedAt={move.levelLearnedAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PokemonInfo;
