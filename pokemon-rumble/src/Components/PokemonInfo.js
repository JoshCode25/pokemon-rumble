import React from 'react';
import Card from './Card';
import Pokemon from './pokemonClass';

const pikachu = new Pokemon('pikachu', 30);
pikachu.getInfo();

const PokemonInfo = () => {
    return(
        <div>
            <Card {...test} />
        </div>
    )
}

export default PokemonInfo;