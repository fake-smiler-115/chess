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
import { nextMove } from "./src/play_game.js";
import { readPositions } from "./src/read_positions.js";

const references = {
  "pawn": pawnPossibleMoves,
  "rook": rookPossibleMoves,
  "knight": knightPossibleMoves,
  "bishop": bishopPossibleMoves,
  "queen": queenPossibleMoves,
  "king": kingPossibleMoves,
};

const main = async() => {
  const playerId = [0];
  let board = createBoard();
  while (true) {
    drawBoard(board);
    await nextMove(board, playerId, references);
    // readPositions();
  }
};

await main();
