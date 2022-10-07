import "./App.css";
import React, { Component } from "react";
import SearchBox from "./Components/SearchBox";
import PokemonInfo from "./Components/PokemonInfo.js";
import pikachu from "./Components/Pokemon/pikachu";
import getNewPokemon from "./Components/getNewPokemon";

class App extends Component {
  constructor() {
    super();
    this.state = {
      identifierField: "",
      levelField: 0,
      displayPokemon: pikachu,
      pokemonList: [pikachu],
    };
  }

  // onSearchChange = (event) => {
  //   this.setState({searchfield: event.target.value })

  //   const pikachu = new Pokemon(this.state.searchfield, 30);
  //   pikachu.getInfo();
  //   this.setState({displayPokemon: pikachu});
  // }
  updateDisplay = (event) => {
    const eventId = event.target.id;
    const eventValue = event.target.value;
    const { identifierField, levelField } = this.state;
    console.log("identifierField: ",identifierField);
    console.log("levelField: ", levelField);
    console.log("event: ", event);

    console.log("event.target.value: ", event.target.value);
    if (eventId === "searchIdentifier") {
      let newSearchIdentifier = eventValue.toLowerCase();
      this.setState({ identifierField: newSearchIdentifier });
      // this.submitInput(eventValue, levelField);
    } else if (eventId === "searchLevel") {
      let newSearchLevel = (typeof eventValue === 'number') ? eventValue : parseInt(eventValue, 10);
      this.setState({ levelField: newSearchLevel });
      // this.submitInput(identifierField, eventValue);
    } else {
      console.log("event: ", event);
    }

    console.log("this.state: ", this.state);
  };

  async setNewPokemon(identifier, level) {
    const newPokemon = await getNewPokemon(identifier, level);
    console.log(newPokemon);
    if (newPokemon) {
      this.setState({ pokemonList: [...this.state.pokemonList, newPokemon] });
      this.setState({ displayPokemon: newPokemon });
    } else {
      typeof identifier === 'number' ? alert(`Sorry, ${identifier} is not a valid Pokemon Number`) 
        : alert(`Sorry, ${identifier} is not a valid Pokemon Name`);
    }
  }

  submitInput = async () => {

    if (this.state.levelField > 0 && this.state.levelField <= 100) {
        const { identifierField, levelField } = this.state;
        try {
          if (this.state.levelField > 0 && this.state.identifierField.length > 0) {
            await this.setNewPokemon(identifierField, levelField);
          }
        } catch (error) {
          console.log("oops: ", error);
        }
    } else {
      alert('Sorry, a Pokemon\'s level must be from 1 - 100');
    }

  };

  // submitInput = () => {
  //   const { identifierField, levelField } = this.state;
  //   console.log(identifierField);
  //   console.log(levelField);
  //   try {
  //     if (this.state.levelField > 0 && this.state.identifierField.length > 0) {
  //       this.setNewPokemon(identifierField, levelField);
  //     }
  //   } catch (error) {
  //     console.log("oops: ", error);
  //   }
  //   console.log(this.state);
  // };

  levelUp = () => {
    //update stats
    const tempDisplayPoke = Object.assign({}, this.state.displayPokemon);
    tempDisplayPoke.level++;

    const currentStats = tempDisplayPoke.currentStats.slice();
    const baseStats = tempDisplayPoke.baseStats.slice();

    const newStats = currentStats.map((stat, i) => {
      const newStat = { name: "", value: 0 };
      const baseStatValue = baseStats[i].value;
      newStat.name = stat.name;
      if (newStat.name === "hp") {
        newStat.value = Math.floor(
          (2 * baseStatValue * tempDisplayPoke.level) / 100 +
            tempDisplayPoke.level +
            10
        );
      } else {
        newStat.value = Math.floor(
          (2 * baseStatValue * tempDisplayPoke.level) / 100 + 5
        );
      }
      return newStat;
    });

    tempDisplayPoke.currentStats = newStats;
    this.setState({ displayPokemon: tempDisplayPoke, levelField: tempDisplayPoke.level});
  };

  render() {
    return (
      <div className="App mw7 center">
        <SearchBox
          updateDisplay={this.updateDisplay}
          submitInput={this.submitInput}
          levelUp={this.levelUp}
        />
        <PokemonInfo pokemon={this.state.displayPokemon} />
      </div>
    );
  }
}

export default App;
