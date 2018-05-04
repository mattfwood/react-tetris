import React, { Component, Fragment } from 'react';

import getRandomPiece from '../utils/getRandomPiece';

// Pieces are made up of 4 squares
// Starting position is set in "getRandomPiece"
// movement is triggered by increasing 'y' position of each square by 1 each second
class Piece extends Component {
  componentDidMount() {
    console.log('Component Mounting');
    // if (this.props.pieces.length === 0) {
      this.initPiece();
    // }
  }

  initPiece = () => {
    // if (this.props.pieces.length === 0) {
      const piece = getRandomPiece();
      const { pieces } = this.props;
      pieces.push(piece);
      this.props.updatePieces(pieces);
      this.startMovement();
    // } else {
    // }
  };

  startMovement = () => {
    const { squares } = this.props;
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

      if (pieceInBounds) {
        const movedSquares = squares.map(square => {
          square.y += 1;
          return square;
        });
        this.setState({ squares: movedSquares });
        const { pieces, id } = this.props;
        pieces[id].squares = movedSquares;
        this.props.updatePieces(pieces);
      } else {
        this.props.addNewPiece();
        clearInterval(pieceFalling);
      }
    }, 500);
  };

  render() {
    const { color } = this.props;
    console.log(this.props.squares);
    return (
      <Fragment>
        {this.props.squares.map(square => (
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
