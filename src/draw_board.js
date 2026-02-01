const getSymbol =(char , value) => {
  if(char === '') {
    return value % 2 ? '⬜️' : '⬛️';
  }
}

const drawBoard = (board) => {
  let stringBoard = '';

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const symbol = getSymbol(board[i][j], i + j);
      stringBoard += symbol;
    }
    stringBoard += '\n';
  }

  console.log(stringBoard);
};
