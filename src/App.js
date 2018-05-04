import React, { Component } from 'react';
import Grid from './components/Grid';
import Piece from './components/Piece';

import getRandomPiece from './utils/getRandomPiece';

import './App.css';

// yikes
// creates an array of 20 rows and 10 columns, each with an object with empty boolean
// squares[0][0] would give you the bottom right most square, etc

class App extends Component {
  state = {
    squares: Array.from({ length: 20 }, row =>
      Array.from({ length: 10 }, column => ({ empty: true }))
    ),
    pieces: [],
  };

  addNewPiece = () => {
    const { pieces } = this.state;
    pieces.push(pieces.length);
    this.setState({ pieces });
  };

  updateSquares = () => {
    const { squares } = this.state;
    squares[0][0].empty = false;
    this.setState({ squares });
  };

  updatePieces = pieces => {
    this.setState({ pieces });
  };

  start = () => {
    const piece = getRandomPiece();
    const { pieces } = this.state;
    pieces.push(piece);
    this.setState({ pieces });
  };

  render() {
    const { squares, pieces, updatePieces } = this.state;
    if (pieces.length === 0) {
      this.start();
    }
    return (
      <div className="App">
        <div className="game-container">
          <Grid squares={squares} />
          {pieces.map((piece, index) => (
            <Piece
              id={index}
              addNewPiece={this.addNewPiece}
              pieces={pieces}
              updatePieces={this.updatePieces}
              squares={piece.squares}
              color={piece.color}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
