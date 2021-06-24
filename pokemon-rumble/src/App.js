import './App.css';
import React, {Component} from 'react';
import SearchBox from './Components/SearchBox';
import PokemonInfo from './Components/PokemonInfo.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      pokemonList: [],
      searchfield: '',
      displayPokemon: {}
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response=> response.json())
      .then(users => {this.setState({ robots: users})});
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
    
    const pikachu = new Pokemon(searchfield, 30);
    pikachu.getInfo();
    this.setState({displayPokemon: pikachu});
  }

  render() {
    return (
      <div className="App">
        <SearchBox />
        <PokemonInfo pokemon={displayPokemon}/>
      </div>
    );
  }
}

export default App;
