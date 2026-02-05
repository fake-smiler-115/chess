import { drawBoard } from "./draw_board.js";
import { readPositions } from "./read_positions.js";

export const isvalidMove = (board, col, row, color) => {
  if (board[row][col].playerColor === color) return true;
  return false;
};

const drawBluePoints = (board, possibleMoves) => {
  const dummyBoard= board.map(x => x.map(x => x));
  for (const move of possibleMoves) {
    const col = move[0];
    const row = move[1];
    dummyBoard[row][col] = {name : 'p'};
  }
     drawBoard(dummyBoard);
}

export const playGame = async (board, playerId, references, color) => {
  const [col, row] = await readPositions();
  const isValid = isvalidMove(board, col, row, color);
  if (!isValid) {
    return console.log("invalid piece");
  }
  const pieceName = board[row][col].name;
  const possibleMoves = references[pieceName](board, col, row, color);
  drawBluePoints(board, possibleMoves, color);
  const [placeCol, placeRow] = await readPositions();
  for (const move of possibleMoves) {
    if (move[0] === placeCol && move[1] === placeRow) {
      board[placeRow][placeCol] = board[row][col];
      board[row][col] = " ";
      playerId[0] = 1 - playerId[0];
      return true;
    }
  }
};
