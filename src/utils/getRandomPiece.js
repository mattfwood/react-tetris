const pieces = {
  // LIIIINE PIECE
  line: {
    squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }],
    color: '#3BC7ED',
  },

  tBlock: {
    squares: [{ x: 6, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 0 }],
    color: '#AC519D',
  },

  square: {
    squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 }],
    color: '#F6D331',
  },

  rightSkew: {
    squares: [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 0 }, { x: 6, y: 0 }],
    color: '#29FD2F',
  },

  leftSkew: {
    squares: [{ x: 4, y: 0 }, { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
    color: '#FC0E1B',
  },

  rightL: {
    squares: [{ x: 4, y: 0 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }],
    color: '#0B24FB',
  },

  leftL: {
    squares: [{ x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 6, y: 0 }],
    color: '#ED7931',
  },
};

function getRandomPiece() {
  const pieceList = Object.keys(pieces);
  const randomPiece = Math.floor(Math.random() * pieceList.length);
  const pieceDetails = pieces[pieceList[randomPiece]];
  const pieceName = pieceList[randomPiece];
  // console.log(pieceDetails, pieceName);
  return { squares: pieceDetails.squares, color: pieceDetails.color, moving: true };
}

// console.log(getRandomPiece(pieces));

export default getRandomPiece;
