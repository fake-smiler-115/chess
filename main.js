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
import { playTheMove } from "./src/play_game.js";

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
  const listner = Deno.listen({
    port: 8000,
    transport: "tcp",
  });

  for await (const conn of listner) {
    connections.push(conn);
    console.log("one player conected ");

    if (connections.length === 2) {
      return connections;
    }
  }
};

const encoder = new TextEncoder();

const printBoardsToConnections = async (conns, board) => {
  for (const conn of conns) {
    await conn.write(encoder.encode(JSON.stringify(board)));
  }
};

const checkCheckMate = (board, colors, colorId) => {
  const isCheck = checkToKing(board, colors[colorId], references);
  if (isCheck) {
    console.log("check", isCheck);
    if (
      !isThereMoves(board, colors[1 - colorId], references, colors[colorId])
    ) {
      return true;
    }
  }
};

const declareWinnerAndCloseConnections = async (conns, color) => {
  for (const conn of conns) {
    await conn.write(encoder.encode(JSON.stringify(["won", color])));
    conn.close();
  }
};

const writeBoard = async (conn, board) => {
  await conn.write(encoder.encode(JSON.stringify(board)));
};

const startGame = async (board, connections, playerId, colors) => {
  while (true) {
    const index = playerId[0];
    await writeBoard(connections[index], board);
    const dummyBoard = board.map((x) => x.map((x) => x));
    const isCheckmate = checkCheckMate(board, colors, index);
    if (isCheckmate) {
      return [colors[index], index];
    }

    const result = await playTheMove(
      connections[index],
      dummyBoard,
      playerId,
      references,
      colors[1 - index],
    );
    if (result === false) continue;
    await writeBoard(connections[index], dummyBoard);

    if (result && checkToKing(dummyBoard, colors[index], references)) {
      playerId[0] = 1 - playerId[0];
      continue;
    }
    board = dummyBoard;
  }
};

const main = async (connections, playerId, colors) => {
  const board = createBoard();
  await printBoardsToConnections(connections, board);
  const [color, index] = await startGame(board, connections, playerId, colors);
  await writeBoard(connections[1 - index], board);
  await declareWinnerAndCloseConnections(connections, color);
  console.log(color + " won");
};

const connections = await init();
await main(connections, [0], ["black", "white"]);
