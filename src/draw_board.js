const getPiecesSymbol = (name, color) => {
  const pieces = {
    'pawn' : '♟️',
    'rook' : '♜'.padEnd(2),
    'knight' : '♘'.padEnd(2),
    'bishop' : '♝'.padEnd(2),
    'queen' : '♕'.padEnd(2),
    'king' : '♔'.padEnd(2),
    'p' : '🔵'
  }
  if (color === 'black')
  return pieces[name];
}

const getSymbol =(char , value) => {
  if (char === ' ') return value % 2 ? '⬛️' : '⬜️';
  return getPiecesSymbol(char.name, 'black')
} 

export const drawBoard = (board) => {
  let stringBoard = '';

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const symbol = getSymbol(board[i][j], i + j);
      stringBoard += symbol;
    }
    stringBoard += '\n';
  }
  console.clear();
  console.log(stringBoard);
};
