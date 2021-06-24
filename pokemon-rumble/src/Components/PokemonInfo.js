import React from 'react';
import Card from './Card';
import InfoLine from './InfoLine';

const PokemonInfo = (pokemon) => {
    return (
        <div className='flex'>
            <Card name ={pokemon.name} id={pokemon.id} />
            <div>
                {
                    pokemon.currentStats.map((stat, i) => {
                        return (
                            <InfoLine 
                                key = {`${stat.name}${i}`}
                                name = {stat.name}
                                value = {stat.value}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default PokemonInfo;