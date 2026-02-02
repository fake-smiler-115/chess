import {
  bishopPossibleMoves,
  kingPossibleMoves,
  knightPossibleMoves,
  pawnPossibleMoves,
  queenPossibleMoves,
  rookPossibleMoves,
} from "./src/check_possible_moves.js";
import { createBoard } from "./src/create_board_array.js";
import { drawBoard } from "./src/draw_board.js";
import { nextMove, playGame } from "./src/play_game.js";

const references = {
  "pawn": pawnPossibleMoves,
  "rook": rookPossibleMoves,
  "knight": knightPossibleMoves,
  "bishop": bishopPossibleMoves,
  "queen": queenPossibleMoves,
  "king": kingPossibleMoves,
};

const main = () => {
  const playerId = [0];
  let board = createBoard();
  while (true) {
    drawBoard(board);
    nextMove(board, playerId, references);
  }
};

main();
