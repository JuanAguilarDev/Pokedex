import React, {useContext} from 'react'
import FavoriteContext from '../../context/pokemons/provider';
import './style.css';

export default function Navbar() {
  const {favoritePokemons} = useContext(FavoriteContext);
  let imgUrl = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";

  return (
    <nav>
        <div/>
        <div>
            <img src={imgUrl} alt="pokeapi_logo" className="navbar-img"/>
        </div>
        <div>&#10084;&#65039; {favoritePokemons?.length}</div>
    </nav>
  )
}
