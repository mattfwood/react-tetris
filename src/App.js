/* eslint-disable */

import React, { Component } from 'react';
import Grid from './components/Grid';
import Piece from './components/Piece';

import getRandomPiece from './utils/getRandomPiece';
import noSquareCollision from './utils/noSquareCollision';
import checkClearedLines from './utils/checkClearedLines';

import './App.css';

const clone = require('clone');

// yikes
// creates an array of 20 rows and 10 columns, each with an object with empty boolean
// squares[0][0] would give you the bottom right most square, etc

class App extends Component {
  state = {
    squares: Array.from({ length: 20 }, () => Array.from({ length: 10 }, () => ({ empty: true }))),
    pieces: [],
    gameOver: false,
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
    // 1. take a copy of pieces state
    const pieces = clone(this.state.pieces);

    // 2. make all pieces stop moving
    const updatedPieces = pieces.map(piece => {
      const updatedPiece = piece;
      updatedPiece.moving = false;
      return updatedPiece;
    });

    // generate a new piece
    const piece = getRandomPiece();
    piece.id = pieces.length;

    // add to pieces
    updatedPieces.push(piece);

    const allSquares = updatedPieces.reduce((squaresAcc, piece) => {
      return [...squaresAcc, ...piece.squares];
    }, []);

    // make sure new piece doesn't create collision
    if (noSquareCollision(allSquares)) {
      this.setState({ pieces: updatedPieces });
    } else {
      console.log('game over');
      this.setState({ gameOver: true });
    }
  };

  updatePieces = pieces => {
    this.setState({ pieces });
  };

  start = () => {
    const piece = getRandomPiece();
    const pieces = { ...this.state.pieces };
    pieces.push(piece);
    this.setState({ pieces });
  };

  beginMovement = () => {
    const pieceFalling = setInterval(() => {
      if (this.state.gameOver === false) {
        const pieces = clone(this.state.pieces);
        const currentPieceIndex = pieces.findIndex(piece => piece.moving);
        const currentPiece = pieces[currentPieceIndex];

        const newSquaresPosition = currentPiece.squares.map(square => {
          const updatedSquare = square;
          updatedSquare.y += 1;
          return updatedSquare;
        });

        // LOGIC CHECKS
        // check if newPosition is in bounds
        const pieceInBounds = !newSquaresPosition.some(square => square.y > 19);

        // make an array of all squares for every piece
        const allSquares = pieces.reduce((squaresAcc, piece) => {
          return [...squaresAcc, ...piece.squares];
        }, []);

        // add new squares to array
        allSquares.concat(newSquaresPosition);

        // check every square for collision with new position
        if (pieceInBounds && noSquareCollision(allSquares)) {
          currentPiece.squares = newSquaresPosition;
          this.setState({ pieces });
        } else {
          // TODO: check for lines cleared
          const initialPieces = clone(this.state.pieces);
          const linesCleared = checkClearedLines(initialPieces);

          if (linesCleared.length > 0) {
            console.log('line cleared');
            // if any lines were cleared
            // remove those squares from play and move all squares above down one spot
            let updatedPieces = initialPieces;

            linesCleared.forEach((lineNumber) => {
              // remove all cleared pieces
              updatedPieces = updatedPieces.map((piece) => {
                piece.squares = piece.squares.map((square) => {
                  // if the square's Y position matches line number
                  if (square.y === lineNumber) {
                    // remove square somehow ??
                    return { x: -1, y: -1 }
                  }
                  // otherwise return it unmodified
                  return square;
                });
                return piece;
              });

              // move all squares above cleared line one line down
              updatedPieces = updatedPieces.map((piece) => {
                piece.squares = piece.squares.map((square) => {
                  // if square is above cleared line, move it down by one
                  if (square.y < lineNumber) {
                    square.y += 1;
                    return square;
                  }
                  return square;
                });
                return piece;
              });
            });

            console.log(updatedPieces);
            this.setState({ pieces: updatedPieces });
          }

          // debugger
          this.addNewPiece();
        }
      } else {
        // if game is over, stop interval
        clearInterval(pieceFalling);
      }
    }, 100);
  };

  movePiece = direction => {
    const pieces = clone(this.state.pieces);

    // find currently moving piece
    const currentPieceIndex = pieces.findIndex(piece => piece.moving);
    const currentPiece = Object.assign({}, pieces[currentPieceIndex]);
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
        currentPiece.squares = currentPiece.squares.map(square => {
          const movedSquare = square;
          movedSquare.x -= 1;
          return movedSquare;
        });
        // pieces[currentPieceIndex].squares.position.x -= 1
        break;

      case 'right':
        currentPiece.squares = currentPiece.squares.map(square => {
          const movedSquare = square;
          movedSquare.x += 1;
          return movedSquare;
        });
        // pieces[currentPieceIndex].squares.position.x += 1
        break;

      default:
        break;
    }

    // check that every square of piece is in bounds
    const pieceInBounds = currentPiece.squares.every(square => {
      return square.x > -1 && square.x < 10;
    });

    // if new position is in-bounds, set the state
    if (pieceInBounds) {
      this.setState({ pieces });
    } else {
      console.log('movement blocked: piece out of bounds');
    }
  };

  render() {
    const { squares, pieces } = this.state;
    // start first piece at beginning of game and trigger movement
    if (pieces.length === 0) {
      this.addNewPiece();
      this.beginMovement();
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
