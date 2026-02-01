const checkAdjacentOFpawn = (board, row, col, color, possibleMoves) => {
  if (
    ![" ", undefined].includes(board[row][col]) &&
    (board[row][col].playerColor !== color)
  ) {
    possibleMoves.push([col, row]);
  }
};

export const straightPossibleMoves = (
  board,
  row,
  col,
  color,
  possibleMoves,
  value,
) => {
  for (let i = row + value; (i > -1 && i < 8)  ; i += value) {
    if (board[i][col] !== " " && board[i][col].playerColor === color) return;
    if (board[i][col] !== " " && board[i][col].playerColor !== color) {
      possibleMoves.push([col ,i])
      return ;
    }
    possibleMoves.push([col ,i]);
  }
};

export const verticalPossibleMoves = (
  board,
  row,
  col,
  color,
  possibleMoves,
  value,
) => {
  for (let i = col + value; (i > -1 && i < 8); i += value) {
    if (board[row][i] !== " " && board[row][i].playerColor === color) return;
    if (board[row][i] !== " " && board[row][i].playerColor !== color) {
      possibleMoves.push([ i, row]);
      return ;
    }
    possibleMoves.push([i, row]);
  }
  return possibleMoves;
};

export const pawnPossibleMoves = (board, col, row, color) => {
  const possibleMoves = [];
  if (board[row - 1][col] === " ") possibleMoves.push([col, row - 1]);
  if (board[row - 2][col] === " " && row === 6) {
    possibleMoves.push([col, row - 2]);
  }
  checkAdjacentOFpawn(board, row - 1, col - 1, color, possibleMoves);
  checkAdjacentOFpawn(board, row - 1, col + 1, color, possibleMoves);
  return possibleMoves;
};

export const rookPossibleMoves = (board, col, row, color) => {
  const possibleMoves = [];
  straightPossibleMoves(board, row, col, color, possibleMoves, -1);
  straightPossibleMoves(board, row, col, color, possibleMoves, 1);
  verticalPossibleMoves(board, row, col, color, possibleMoves, -1);
  verticalPossibleMoves(board, row, col, color, possibleMoves, 1);
  return possibleMoves;
};
