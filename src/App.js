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

  componentDidMount() {
    // CONTROLLER
    window.addEventListener('keyup', event => {
      switch (event.code) {
        case 'ArrowUp':
          this.movePiece('up');
          break;

        case 'ArrowDown':
          this.movePiece('down');
          break;

        case 'ArrowLeft':
          this.movePiece('left');
          break;

        case 'ArrowRight':
          this.movePiece('right');
          break;

        default:
          break;
      }
    });
  }

  addNewPiece = () => {
    // make all other pieces stop moving
    const pieces = this.state.pieces.map((piece) => {
      piece.moving = false;
      return piece;
    });

    // generate a new piece
    const piece = getRandomPiece();
    // add to pieces
    pieces.push(piece);
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

  movePiece = (direction) => {
    const pieces = this.state.pieces.slice();

    // find currently moving piece
    const currentPieceIndex = pieces.findIndex(piece => piece.moving);
    const currentPiece = Object.assign({}, pieces[currentPieceIndex]);
    console.log(currentPieceIndex);
    // TODO: Add logic to check if piece collides with wall
    // debugger
    switch (direction) {
      case 'up':
        // TODO: Add rotating logic
        // pieces[currentPieceIndex].position.x += 1
        break;

      case 'down':
        // TODO: Add increased falling speed
        // pieces[currentPieceIndex].position.x += 1
        break;

      case 'left':
        currentPiece.squares = currentPiece.squares.map((square) => {
          square.x -= 1;
          return square;
        });
        // pieces[currentPieceIndex].squares.position.x -= 1
        break;

      case 'right':
        currentPiece.squares = currentPiece.squares.map((square) => {
          square.x += 1;
          return square;
        });
        // pieces[currentPieceIndex].squares.position.x += 1
        break;

      default:
        break;
    }

    // check that every square of piece is in bounds
    // const pieceInBounds = currentPiece.squares.every((square) => {
    //   return square.x > -1 && square.x < 10;
    // });

    // console.log(pieceInBounds);

    // // if new position is in-bounds, set the state
    // if (pieceInBounds) {
    //   // this.setState({ pieces });
    // } else {
    //   console.log('movement blocked: piece out of bounds');
    // }
  }

  render() {
    const { squares, pieces, updatePieces } = this.state;
    if (pieces.length === 0) {
      this.addNewPiece();
    }
    // debugger
    return (
      <div className="App">
        <div className="game-container">
          <Grid squares={squares} />
          {pieces.map((piece, index) => (
            <Piece
              id={index}
              pieces={pieces}
              piece={piece}
              addNewPiece={this.addNewPiece}
              updatePieces={this.updatePieces}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
