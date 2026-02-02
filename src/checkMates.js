import { reverseTheBoard } from "./play_game.js";

const allColorPieces = (board, color) => {
  const pieces = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].playerColor === color) {
        pieces.push([j, i, board[i][j].name]);
      }
    }
  }
  return pieces;
};

const oppositeKingPosition = (board, pieceColor) => {
  let color = 'white';
  if (pieceColor === "white") color = "black";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].name === "king" && board[i][j].playerColor === color) {
        return [j, i];
      }
    }
  }
};

export const checkToKing = (board, color, references) => {
  let dummyBoard = board.map((x) => x.map((x) => x));

  if (color === "black") {
    dummyBoard = reverseTheBoard(board);
  }

  const allPieces = allColorPieces(dummyBoard, color);
  const possibleMoves = allPieces.flatMap(([col, row, name]) =>
    references[name](dummyBoard, col, row, color)
  );
  const [kingCol, kingRow] = oppositeKingPosition(dummyBoard, color); 
  if (color === "black") {
    dummyBoard = reverseTheBoard(board);
  }

  return possibleMoves.filter(([col, row]) =>
    col === kingCol && row === kingRow
  )
    .length > 0;
};
