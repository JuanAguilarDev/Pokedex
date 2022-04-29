import {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import SearchBox from './components/SearchBox';
import apiCall from './api';
import Pokedex from './components/Pokedex';
import { FavoriteProvider } from './context/pokemons/provider';

const localStorageKey = "favorite_pokemon";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const getPokemons = async() =>{
    try {
      const pokemonResults = await apiCall({url:`https://pokeapi.co/api/v2/pokemon?limit=25&offset=${25 * page}`});
      const promises = pokemonResults.results.map( async (pokemon) =>{
        return await apiCall({url:pokemon.url});
      });    
      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotal(Math.ceil(pokemonResults.count / 25));
      setNotFound(false);
    } catch (error) {
        setLoading(true);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    setFavorites(pokemons);
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    if(!searching){
      setLoading(true);
      getPokemons();  
    }
  }, [page]);

  const updateFavoritePokemons = (name) =>{
    const updated = [...favorites];
    const isFavorite = favorites.indexOf(name);
    if(isFavorite >= 0){
      updated.splice(isFavorite, 1);
    }else{
      updated.push(name);
    }
    setFavorites(updated);
    // Save favorite pokemons to local storage
    window.localStorage.setItem(localStorageKey, 
      JSON.stringify(updated));
  };

  const onSearch = async(pokemon)=>{
    if(!pokemon){
      return getPokemons();
    }
    setLoading(true);
    try{
      setSearching(true);
      const result = await apiCall({url:`https://pokeapi.co/api/v2/pokemon/${pokemon}`});
      setPage(0);
      setTotal(1);
      setNotFound(false);
      setPokemons([result]);
      setLoading(false);
      setSearching(false);
    }catch{
      setNotFound(true);
      setLoading(false);
      return;
    }
  } 


  return (
    <FavoriteProvider value={{favoritePokemons: favorites, updateFavoritePokemons: updateFavoritePokemons}}>
      <div className="App">
        <Navbar></Navbar>
        <SearchBox onSearch={onSearch}></SearchBox>
        {notFound ? <div className="not-found">No se encontro el pokemon...</div> : <Pokedex loading={loading} total={total} page={page} setPage={setPage} pokemons={pokemons}></Pokedex>}
      </div>
    </FavoriteProvider>
  );
}

export default App;
