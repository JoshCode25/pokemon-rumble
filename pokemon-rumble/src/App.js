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
      levelField: "",
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
    console.log(identifierField);
    console.log(levelField);

    console.log(event.target.value);
    if (eventId === "searchIdentifier") {
      this.setState({ identifierField: eventValue });
      // this.submitInput(eventValue, levelField);
    } else if (eventId === "searchLevel") {
      this.setState({ levelField: eventValue });
      // this.submitInput(identifierField, eventValue);
    } else {
      console.log(event);
    }

    console.log(this.state);
  };

  async setNewPokemon(identifier, level) {
    const newPokemon = await getNewPokemon(identifier, level);
    console.log(newPokemon.spriteList.length);
    console.log(newPokemon.learnedMovesList.length);
    console.log(newPokemon.currentMovesList.length);
    console.log(newPokemon.currentStats.length);
    this.setState({ pokemonList: [...this.state.pokemonList, newPokemon] });
    this.setState({ displayPokemon: newPokemon });
    console.log(this.state.displayPokemon);
  }

  submitInput = () => {
    const { identifierField, levelField } = this.state;
    console.log(identifierField);
    console.log(levelField);
    try {
      if (this.state.levelField > 0 && this.state.identifierField.length > 0) {
        this.setNewPokemon(identifierField, levelField);
      }
    } catch (error) {
      console.log("oops: ", error);
    }
    console.log(this.state);
  };

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
    this.setState({ displayPokemon: tempDisplayPoke });
    console.log(this.state);
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
