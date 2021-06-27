import './App.css';
import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';
import pikachu from './Components/Pokemon/pikachu';
import charizard from './Components/Pokemon/charizard';
import Pokemon from './Components/pokemonClass';

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [pikachu, charizard],
      identifierField: '',
      levelField: ''
    }
  }

  // onSearchChange = (event) => {
  //   this.setState({searchfield: event.target.value })
    
  //   const pikachu = new Pokemon(this.state.searchfield, 30);
  //   pikachu.getInfo();
  //   this.setState({displayPokemon: pikachu});
  // }
  updateInput = (event) => {
    const eventId = event.target.id;
    const eventValue = event.target.value;
    const {identifierField, levelField} = this.state;

    console.log(event.target.value);
    if(eventId === 'searchIdentifier') {
      this.setState({identifierField: eventValue});
      this.submitInput({eventValue, levelField});

    } else if(eventId === 'searchLevel') {
      this.setState({levelField: eventValue});
      this.submitInput({identifierField, eventValue});
    } else {
      console.log(event);
    }

    console.log(this.state);
  }

  submitInput = (identifierField, levelField) => {
    console.log(identifierField, levelField);
    try {
       if(this.state.levelField > 0) {
          const newPokemon = new Pokemon(identifierField, levelField);
          newPokemon.getInfo();
        }
      } catch (error) {
        console.log('oops: ', error)
      }
  }

  render() {
    return (
      <div className="App mw7 center">
        <SearchBox updateInput={this.updateInput}/>
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
