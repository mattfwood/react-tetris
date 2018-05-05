// takes in array of squares and checks if any have duplicate coordinates
// returns boolean True if there is collision, false otherwise
const noSquareCollision = (squares) => {
  return squares.every((square, index, array) => {
    // check if overlap or if square is cleared (at coordinates (-1, -1))
    return (
      array.findIndex(item => JSON.stringify(item) === JSON.stringify(square)) === index ||
      square.x === -1
    );
  });
};

export default noSquareCollision;
