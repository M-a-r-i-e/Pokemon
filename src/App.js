import React, { useState, useEffect } from 'react';
import { getAllPokemon, getPokemon } from './components/services/pokemon';
import Card from './components/Card';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  const [pokemonDaten, setPokemonDaten] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon?limit=21'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
      console.log(response);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon (response.results);
      console.log(pokemon);
      setLoading(false);
    }

    fetchData();
  }, [])

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if(!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadingPokemon = async data => {
    let _pokemon = await Promise.all(
      data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon.url);
      return pokemonRecord
    })
    );
    setPokemonDaten(_pokemon)
  };

  console.log(pokemonDaten);

  return (
    <div className="container">
      <Navigation/>
        <div className="button">
          <button onClick={prev}>prev</button>
          <button onClick={next}>next</button>
        </div>
        {loading ? <h1>Loading ... </h1> : (
          
            <div className="grid-container">
              {pokemonDaten.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}/>
              })}
            </div>
          )
        }

      <div className="button">
      <button onClick={prev}>prev</button>
      <button onClick={next}>next</button>
      </div>
    </div>

  );
}

export default App;
