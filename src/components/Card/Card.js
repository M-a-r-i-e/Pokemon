import React from 'react';
import './style.css';
import pokemonTypes from '../../helpers/pokemonTypes';

function Card ({ pokemon }) {
    return (
        <div className="pokeContainer">

            <div className="bilder">
                <img src={pokemon.sprites.front_default} alt=""></img>
            </div>
            <div className="namen">
                {pokemon.name}
            </div>
            <div className="typ">
                {pokemon.types.map(type => {
                    return (
                        <div className="typdetails" style={{backgroundColor: pokemonTypes[type.type.name]}}>
                            {type.type.name}
                        </div>
                    )
                })}
            </div>
            <div className="breite">
                <p>weight:</p>
                <p>{pokemon.weight}</p>
            </div>
            <div className="höhe">
                <p>height:</p>
                <p>{pokemon.height}</p>
            </div>
            <div className="ability">
                <p>ability:</p>
                <p>{pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    )
}

export default Card;