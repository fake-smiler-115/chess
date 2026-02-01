const checkAdjacentOFpawn = (board, row, col, color, possibleMoves) => {
  if (![' ', undefined] .includes(board[row][col]) &&
   (board[row][col].playerColor !== color)) {
    possibleMoves.push([col, row]);
  }
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

// export const rookPossibleMoves = (board, col, row, color) => {
//   const possibleMoves = [];
//   i
// }