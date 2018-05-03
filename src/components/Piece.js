import React, { Component, Fragment } from 'react';

import getRandomPiece from '../utils/getRandomPiece';

// Pieces are made up of 4 squares
// Starting position is set in "getRandomPiece"
// movement is triggered by increasing 'y' position of each square by 1 each second
class Piece extends Component {
  state = {
    squares: [],
    color: '',
  };

  componentDidMount() {
    console.log('Component Mounting');
    const { squares } = this.state;
    // if squares hasn't been set been set
    if (squares.length === 0) {
      // get a random piece and set its position
      this.initPiece();
    }
  }

  initPiece = () => {
    const piece = getRandomPiece();
    console.log(piece);
    this.setState(
      {
        squares: piece.details.squares,
        color: piece.details.color,
      },
      () => this.startMovement()
    );
  };

  startMovement = () => {
    const { squares } = this.state;
    console.log(squares);
    // if the no square in a piece has touched the bottom
    setInterval(() => {
      // check if any squares are colliding with grid
      const pieceNotColliding = !squares.some(square => square.y > 20);
      // console.log(pieceNotColliding);

      if (pieceNotColliding) {
        console.log(squares);
        const movedSquares = squares.map(square => {
          square.y += 1;
          return square;
        });
        console.log(movedSquares);
        this.setState({ squares: movedSquares });
      }
    }, 1000);
  };

  render() {
    const { squares, color } = this.state;
    return (
      <Fragment>
        {squares.map(square => (
          <div
            className="Piece"
            style={{
              top: `${square.y * 30}px`,
              left: `${square.x * 30}px`,
              backgroundColor: color,
            }}
          />
        ))}
      </Fragment>
    );
  }
}

export default Piece;
