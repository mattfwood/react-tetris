import React, { Component, Fragment } from 'react';

import getRandomPiece from '../utils/getRandomPiece';

// Pieces are made up of 4 squares
// Starting position is set in "getRandomPiece"
// movement is triggered by increasing 'y' position of each square by 1 each second
class Piece extends Component {
  componentDidMount() {
    console.log('Component Mounting');
    this.startMovement();
  }

  startMovement = () => {
    const { pieces } = this.props;
    const { moving, squares } = this.props.piece;
    // if the no square in a piece has touched the bottom
    const pieceFalling = setInterval(() => {
      // check if any squares are colliding with grid
      // check if piece has hit the ground
      const pieceInBounds = !squares.some(square => square.y > 18);
      // TODO: Make sure it checks for collision with other pieces
      // const pieceNotColliding = pieces.any(piece => {
      // piece.squares.any()
      // })
      // console.log(pieceInBounds);

      if (pieceInBounds && moving) {
        const movedSquares = squares.map(square => {
          square.y += 1;
          return square;
        });
        const { pieces, id } = this.props;
        pieces[id].squares = movedSquares;
        this.props.updatePieces(pieces);
      } else {
        // if unit has hit bounds, create a new piece
        this.props.addNewPiece();
        clearInterval(pieceFalling);
      }
    }, 500);
  };

  render() {
    const { piece } = this.props;
    const { squares, color } = piece;
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
