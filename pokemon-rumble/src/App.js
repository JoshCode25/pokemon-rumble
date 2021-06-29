import './App.css';
import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';
import pikachu from './Components/Pokemon/pikachu';
import Pokemon from './Components/pokemonClass';

class App extends Component {
  constructor() {
    super()
    this.state = {
      identifierField: '',
      levelField: '',
      displayPokemon: pikachu
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

  levelUp = () => {
    //update stats
    const tempDisplayPoke = Object.assign({}, this.state.displayPokemon);
    tempDisplayPoke.level++;

    const currentStats = tempDisplayPoke.currentStats.slice();
    const baseStats = tempDisplayPoke.baseStats.slice();

    const newStats = currentStats.map((stat, i) => {
      const newStat = {name:'', value:0};
      const baseStatValue = baseStats[i].value;
      newStat.name = stat.name
      if (newStat.name === 'hp') {
        newStat.value = Math.floor((2*parseInt(baseStatValue, 10) + this.level)/100 + 5)
      } else {
        newStat.value = Math.floor((2*parseInt(baseStatValue, 10) + this.level)/100 + this.level +10)
      }

      return newStat;
    }, this.state.displayPokemon)

    tempDisplayPoke.currentStats = newStats;
    this.setState({displayPokemon: tempDisplayPoke})
  }

  render() {
    return (
      <div className="App mw7 center">
        <SearchBox updateInput={this.updateInput} levelUp={this.levelUp}/>
        <PokemonInfo pokemon={this.state.displayPokemon}/>
      </div>
    );
  }
}

export default App;
