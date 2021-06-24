import React from 'react';

const Card = ({ name, id }) => {
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='pokemon' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} />
      <div>
        <h2>{name}</h2>
      </div>
    </div>
  );
}

export default Card;