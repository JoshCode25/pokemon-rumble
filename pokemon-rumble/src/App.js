import './App.css';
import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';
import Pokemon from './Components/pokemonClass.js'

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [],
      searchfield: '',
      displayPokemon: {}
    }
  }

  onSearchChange = (event) => {
    this.setState({searchfield: event.target.value })
    
    const pikachu = new Pokemon({state.searchfield}, 30);
    pikachu.getInfo();
    this.setState({displayPokemon: pikachu});
  }

  render() {
    return (
      <div className="App">
        <SearchBox searchChange={this.onSearchChange}/>
        <PokemonInfo pokemon={{state.displayPokemon}}/>
      </div>
    );
  }
}

export default App;
