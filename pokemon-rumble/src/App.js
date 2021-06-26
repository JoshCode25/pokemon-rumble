import './App.css';
import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';
import pikachu from './Components/Pokemon/pikachu';
import charizard from './Components/Pokemon/charizard';

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [pikachu, charizard],
      searchfield: '',
    }
  }

  // onSearchChange = (event) => {
  //   this.setState({searchfield: event.target.value })
    
  //   const pikachu = new Pokemon(this.state.searchfield, 30);
  //   pikachu.getInfo();
  //   this.setState({displayPokemon: pikachu});
  // }

  render() {
    return (
      <div className="App mw7 center">
        <SearchBox searchChange={this.onSearchChange}/>
        {
          this.state.pokemonList.map((pokemon, i) => {
            return (
              <PokemonInfo key={`${pokemon.name}${i}`} pokemon={pokemon}/>
            )
          })
        }
      </div>
    );
  }
}

export default App;
