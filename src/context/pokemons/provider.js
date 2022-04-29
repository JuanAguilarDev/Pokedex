import {createContext} from 'react';
import PokemonContext from ".";

const FavoriteContext = createContext({
    favoritePokemons: [],
    updateFavoritePokemons: (id) => null,
});

export const FavoriteProvider = FavoriteContext.Provider;

export default FavoriteContext;