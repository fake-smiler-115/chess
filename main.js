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
import { playGame } from "./src/play_game.js";

const references = {
  "pawn": pawnPossibleMoves,
  "rook": rookPossibleMoves,
  "knight": knightPossibleMoves,
  "bishop": bishopPossibleMoves,
  "queen": queenPossibleMoves,
  "king": kingPossibleMoves,
};

const init = async () => {
  const connections = [];
  const listner = Deno.listen({port : 8000});
  for await (const conn of listner) {
    connections.push(conn);
    console.log('one player conected ');
    
    if (connections.length === 2) {
      return connections;
    }
  }
}

const encoder = new TextEncoder()

const printBoardsToConnections = async(conns, board) => {
  for (const conn of conns) {
    await conn.write(encoder.encode(JSON.stringify(board)));
  } 
}

const checkCheckMate = (board, colors, colorId) => {
const isCheck = checkToKing(board, colors[colorId], references);
    if (isCheck) {
      console.log("check", isCheck);
      if (!isThereMoves(board, colors[1 - colorId],references,  colors[colorId] )) {
        return true;
      }
    }
}

const main = async () => {
  const colors = ['black', 'white'];
  const playerId = [0];
  const conns = await init();
  let board = createBoard();
  await printBoardsToConnections(conns, board);
  while (true) {
    const colorId = playerId[0];
    await conns[colorId].write(encoder.encode(JSON.stringify(board)));
    let dummyBoard = board.map((x) => x.map((x) => x));
    const isCheckmate = checkCheckMate(board, colors, colorId);
    if (isCheckmate) 
      return console.log(`${colors[colorId]} won the game !`);

    const result = await playGame(conns[colorId] , dummyBoard, playerId, references, colors[1 - colorId]);
    if (result && checkToKing(dummyBoard, colors[colorId], references)) {
      playerId[0] = 1 - playerId[0];
      continue;
    }
    board = dummyBoard;
    if (result)
    await conns[colorId].write(encoder.encode(JSON.stringify(board)));
  }
};

await main();