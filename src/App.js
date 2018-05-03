import React, { Component } from 'react';
import Grid from './components/Grid';
import Piece from './components/Piece'

import './App.css';

// yikes
// creates an array of 20 rows and 10 columns, each with an object with empty boolean
// squares[0][0] would give you the bottom right most square, etc

class App extends Component {
  state = {
    squares: Array.from({ length: 20 }, row => Array.from({ length: 10 }, column => ({ empty: true })))
  };

  updateSquares = () => {
    const { squares } = this.state;
    squares[0][0].empty = false;
    this.setState({ squares });
  }

  render() {
    const { squares } = this.state;
    return (
      <div className="App">
        <div className="game-container">
          <Grid squares={squares} />
          <Piece />
        </div>
      </div>
    );
  }
}

export default App;
