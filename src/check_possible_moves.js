const checkAdjacentOFpawn = (board, row, col, color, possibleMoves) => {
  if (
    ![" ", undefined].includes(board[row][col]) &&
    (board[row][col].playerColor === enemyColor(color))
  ) {
    possibleMoves.push([col, row]);
  }
};

const enemyColor = (color) => {
  if (color === "white") return "black";
  return "white";
};

export const crossPossibleMoves = (
  board,
  row,
  col,
  color,
  possibleMoves,
  value,
  colMove,
) => {
  let currentCol = col + colMove;
  for (let i = row + value; (i > -1 && i < 8); i += value) {
    if (board[i][currentCol] === undefined) return;
    if (
      board[i][currentCol] !== " " && board[i][currentCol].playerColor === color
    ) return;
    if (
      board[i][currentCol] !== " " && board[i][currentCol].playerColor === enemyColor(color)
    ) {
      possibleMoves.push([currentCol, i]);
      return;
    }
    possibleMoves.push([currentCol, i]);
    currentCol += colMove;
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
  for (let i = row + value; (i > -1 && i < 8); i += value) {
    if (board[i][col] !== " " && board[i][col].playerColor === color) return;
    if (board[i][col] !== " " && board[i][col].playerColor === enemyColor(color)) {
      possibleMoves.push([col, i]);
      return;
    }
    possibleMoves.push([col, i]);
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
    if (board[row][i] !== " " && board[row][i].playerColor === enemyColor(color)) {
      possibleMoves.push([i, row]);
      return;
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

export const bishopPossibleMoves = (board, col, row, color) => {
  const possibleMoves = [];
  crossPossibleMoves(board, row, col, color, possibleMoves, -1, -1);
  crossPossibleMoves(board, row, col, color, possibleMoves, -1, 1);
  crossPossibleMoves(board, row, col, color, possibleMoves, 1, -1);
  crossPossibleMoves(board, row, col, color, possibleMoves, 1, 1);
  return possibleMoves;
};

export const knightPossibleMoves = (board, col, row, color) => {
  const possibleMoves = [];
  const maxPossibel = [[-2, -1], [2, -1], [-1, -2], [1, -2], [-2, 1], [2, 1], [
    -1,
    2,
  ], [1, 2]];
  for (const position of maxPossibel) {
    const currentCol = col + position[0];
    const currentRow = row + position[1];
    try {
      if (board[currentRow][currentCol] === " ") {
        possibleMoves.push([currentCol, currentRow]);
      }
      if (
        board[currentRow][currentCol] !== undefined &&
        board[currentRow][currentCol].playerColor === enemyColor(color)
      ) {
        possibleMoves.push([currentCol, currentRow]);
      }
    } catch {}
  }
  return possibleMoves;
};

export const queenPossibleMoves = (board, col, row, color) => {
  const possibleMoves = [];
  straightPossibleMoves(board, row, col, color, possibleMoves, -1);
  straightPossibleMoves(board, row, col, color, possibleMoves, 1);
  verticalPossibleMoves(board, row, col, color, possibleMoves, -1);
  verticalPossibleMoves(board, row, col, color, possibleMoves, 1);
  crossPossibleMoves(board, row, col, color, possibleMoves, -1, -1);
  crossPossibleMoves(board, row, col, color, possibleMoves, -1, 1);
  crossPossibleMoves(board, row, col, color, possibleMoves, 1, -1);
  crossPossibleMoves(board, row, col, color, possibleMoves, 1, 1);
  return possibleMoves;
};
