import React, { useContext } from 'react';
import FavoriteContext from '../../../context/pokemons/provider';
import './style.css';

export default function Pokemon({pokemon, id}) {
    const redHeart = "❤️";
    const blackHeart = "♥";
    const {favoritePokemons, updateFavoritePokemons} = useContext(FavoriteContext);
    const heart = favoritePokemons.includes(pokemon.name) ? redHeart : blackHeart;

    const onClickHeart = (event) =>{
        event.preventDefault();
        updateFavoritePokemons(pokemon.name);
    }
    
  return (
    <div className="pokemon-card" key={id}>
        <div className="pokemon-img-container">
            <img className="pokemon-img" src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
        <div className="card-body">
            <div className="card-top">
                <h3>{pokemon.name}</h3>
                <div>#{pokemon.id}</div>
            </div>
            <div className="card-bottom">
                <div className="pokemon-type">
                    {pokemon.types.map((type, index)=>{
                        return(
                            <div className="pokemon-type-text" key={index}>{type.type.name}</div>
                        );
                    })}
                </div>
                <button onClick={onClickHeart}>
                    <div className="pokemon-favorite">{heart}</div>
                </button>
            </div>
        </div>
    </div>
  )
}
