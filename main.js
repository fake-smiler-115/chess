import {
  bishopPossibleMoves,
  kingPossibleMoves,
  knightPossibleMoves,
  pawnPossibleMoves,
  queenPossibleMoves,
  rookPossibleMoves,
} from "./src/check_possible_moves.js";
import { checkToKing, isThereMoves } from "./src/checkMates.js";
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

const main = async () => {
  const colors = ['black', 'white'];
  const playerId = [0];
  let board = createBoard();
  while (true) {
    const colorId = playerId[0];
    drawBoard(board);
    let dummyBoard = board.map((x) => x.map((x) => x));
    const isCheck = checkToKing(board, colors[colorId], references);
    if (isCheck) {
      console.log("check", isCheck);
      if (!isThereMoves(board, colors[1 - colorId],references,  colors[colorId] )) {
        return console.log(`${colors[colorId]} won the game !`);
      }
    }

    const result = await nextMove(dummyBoard, playerId, references);
    if (result && checkToKing(dummyBoard, colors[colorId], references)) {
      playerId[0] = 1 - playerId[0];
      continue;
    }
    board = dummyBoard;
  }
};

await main();
