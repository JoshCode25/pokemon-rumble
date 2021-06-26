import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';
import pikachu from './Components/Pokemon/pikachu';

class PokemonCard extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [pikachu],
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
      <div className="App">
        <SearchBox searchChange={this.onSearchChange}/>
        <PokemonInfo pokemon={this.state.pokemonList[0]}/>
      </div>
    );
  }
}

export default PokemonCard;