import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

// Pieces are made up of 4 squares
// Starting position is set in "getRandomPiece"
// movement is triggered by increasing 'y' position of each square by 1 each second
class Piece extends Component {
  static propTypes = {
    piece: PropTypes.shape({
      squares: PropTypes.array.isRequired,
      color: PropTypes.string.isRequired,
      moving: PropTypes.bool.isRequired,
    }).isRequired,
    // id: PropTypes.number.isRequired,
    // updatePieces: PropTypes.func.isRequired,
    // pieces: PropTypes.arrayOf(PropTypes.object).isRequired,
    // addNewPiece: PropTypes.func.isRequired,
  }

  // componentDidMount() {
  //   console.log('Component Mounting');
  //   this.startMovement();
  // }

  startMovement = () => {
    // const { pieces } = this.props;
    // const { moving, squares } = this.props.piece;
    // // if the no square in a piece has touched the bottom
    // const pieceFalling = setInterval(() => {
    //   // check if any squares are colliding with grid
    //   // check if piece has hit the ground
    //   const pieceInBounds = !squares.some(square => square.y > 18);

    //   const newSquaresPosition = squares.map((square) => {
    //     const updatedSquare = square;
    //     updatedSquare.y += 1;
    //     return updatedSquare;
    //   });

    //   console.log(pieces.length);

    //   const allSquares = pieces.reduce((squaresAcc, piece) => {
    //     // squaresAcc.concat(piece.squares);
    //     return [...squaresAcc, ...piece.squares];
    //   }, []);

    //   const noSquareCollision = allSquares.every((square, index) => {
    //     // console.log(square);
    //     return allSquares.lastIndexOf(square) === index;
    //   });

    //   console.log(noSquareCollision);

    //   if (pieceInBounds && moving && noSquareCollision) {
    //     const { id } = this.props;
    //     pieces[id].squares = newSquaresPosition;
    //     this.props.updatePieces(pieces);
    //   } else {
    //     // if unit has hit bounds, create a new piece
    //     this.props.addNewPiece();
    //     clearInterval(pieceFalling);
    //   }
    // }, 500);
  };

  render() {
    const { piece } = this.props;
    const { squares, color } = piece;
    return (
      <Fragment>
        {squares.map((square, index) => (
          <div
            key={index}
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
