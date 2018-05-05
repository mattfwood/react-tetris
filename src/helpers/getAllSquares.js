// takes in array of pieces, returns back arary of all squares

const getAllSquares = (pieces) => {
  return pieces.reduce((squaresAcc, piece) => {
    return [...squaresAcc, ...piece.squares];
  }, []);
};

// export default getAllSquares;
export default getAllSquares;
