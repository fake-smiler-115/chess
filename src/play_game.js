import { drawBoard } from "./draw_board.js";
import { readPositions } from "./read_positions.js";

const getTheMoveOfPlayer = (color) => {
  const piecePosition = prompt("piece position");
  const [col, row] = piecePosition.split(" ").map((x) => +x);
  if (color === 'white') {
    return [col, row];
  }
   return [7 -col , 7 - row];
};

const isvalidMove = (board, col, row, color) => {
  if (board[row][col].playerColor === color) return true;
  return false;
};

const drawBluePoints = (board, possibleMoves, color) => {
  const dummyBoard= board.map(x => x.map(x => x));
  for (const move of possibleMoves) {
    const col = move[0];
    const row = move[1];
    dummyBoard[row][col] = {name : 'p'};
  }
  if (color === 'white') {
    return drawBoard(dummyBoard);
  }
  drawBoard(reverseTheBoard(dummyBoard));
}

const reverseTheBoard = (board) => {
  const dummyBoard = [...board];
  const reversedBoard = dummyBoard.reverse().map((x) => x.reverse());
  return reversedBoard;
}

export const nextMove = async (board, playerId, references) => {
  if (playerId[0] === 0) {
    return await playGame(board, playerId, references, "white");
  }

  const reversedBoard = reverseTheBoard(board);
  await playGame(reversedBoard, playerId, references, "black");
  board = reverseTheBoard(board);
};

export const playGame = async (board, playerId, references, color) => {
  const [col, row] = await readPositions(color);
  const isValid = isvalidMove(board, col, row, color);
  if (!isValid) {
    return console.log("invalid piece");
  }
  const pieceName = board[row][col].name;
  const possibleMoves = references[pieceName](board, col, row, color);
  drawBluePoints(board, possibleMoves, color);
  const [placeCol, placeRow] = await readPositions(color);
  for (const move of possibleMoves) {
    if (move[0] === placeCol && move[1] === placeRow) {
      board[placeRow][placeCol] = board[row][col];
      board[row][col] = " ";
      playerId[0] = 1 - playerId[0];
      return;
    }
  }
};
