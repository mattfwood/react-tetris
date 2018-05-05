/* eslint-disable */

// accepts array of pieces
// and checks if any lines all contain squares

import getAllSquares from '../helpers/getAllSquares';

const checkClearedLines = (pieces) => {
  // turn pieces into squares
  const squares = getAllSquares(pieces);
  // group squares by line
  const lines = squares.reduce((linesAcc, square) => {
    const row = square.y.toString();
    if (linesAcc[row]) {
      linesAcc[row].push(square);
    } else {
      linesAcc[row] = [square];
    }

    return linesAcc;
  }, []);

  const linesCleared = [];

  // check each line
  lines.forEach((line) => {
    // generate array of numbers 0-9 to check each column
    const columns = Array.from(Array(10).keys());

    // line is clear if every column has a square present
    const lineClear = columns.every((item, index) => {
      const columnOccupied = line.findIndex(square => square.x === index) !== -1;
      return columnOccupied;
    });

    if (lineClear) {
      // only return line number
      linesCleared.push(line[0].y);
    }
  });

  return linesCleared;
};

// console.log(`Lines Cleared: ${checkClearedLines(pieces)}`);

export default checkClearedLines;
