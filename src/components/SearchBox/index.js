import React, {useState} from 'react'
import apiCall from '../../api';
import './style.css';

export default function SearchBox({onSearch}) {
    const [searchText, setSearchText] = useState("");
    const [pokemon, setPokemon] = useState([]);
    const [hasError, setHasError] = useState(false);

    const onChange = (event) =>{
        setSearchText(event.target.value);
        if(event.target.value?.length === 0){
            onSearch(null);
        }
    }

    const handleSearchOnClick = async () => {
        try {
           onSearch(searchText);
        } catch (error) {
            setSearchText("");
            setHasError(true);
        }
    };

  return (
    <div className="search-box-container">
        <div className="search-bar">
            <input type="text" placeholder="Buscar pokemon..." value={searchText} onChange={onChange}/>
        </div>
        <div className="search-button">
            <button onClick={handleSearchOnClick} type="submit" disabled={!searchText.length}>Buscar</button>
        </div>
    </div>
  )
}
