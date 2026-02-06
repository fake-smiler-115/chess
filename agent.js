import { drawBoard } from "./src/draw_board.js";
import { readPositions } from "./src/read_positions.js";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const isvalidMove = (board, col, row, color) => {
  if (board[row][col].playerColor === color) return true;
  return false;
};
const getThePositions = async (board, color) => {
  const [col, row] = await readPositions();
  const isValid = isvalidMove(board, col, row, color);
  if (!isValid) {
    console.log("invalid piece");
    return [false];
  }
  return [true, col, row];
};

const readPlacePositons = async (conn) => {
  const result = await readPositions();
  console.log(result);

  await conn.write(encoder.encode(JSON.stringify(result)));
};

const draw_board = async (conn, buffer) => {
  const n = await conn.read(buffer);
  const board = JSON.parse(decoder.decode(buffer.slice(0, n)));
  drawBoard(board);
};

const getPositions = async (conn, buffer) => {
  const n = await conn.read(buffer);
  const [board, color] = JSON.parse(decoder.decode(buffer.slice(0, n)));
  const result = await getThePositions(board, color);
  await conn.write(encoder.encode(JSON.stringify(result)));
  return result[0];
};

const isPossibleMove = async (conn, buffer) => {
  const n = await conn.read(buffer);
  const isPossible = JSON.parse(decoder.decode(buffer.slice(0, n)));
  console.log(isPossible);
  return isPossible;
};

const main = async () => {
  const conn = await Deno.connect({
    port: 8000,
    transport: "tcp",
  });
  const buffer = new Uint8Array(10000);
  await draw_board(conn, buffer);
  while (true) {
    await draw_board(conn, buffer);
    if (!await getPositions(conn, buffer)) {
      continue;
    }
    await draw_board(conn, buffer);
    await readPlacePositons(conn);
    if (await isPossibleMove(conn, buffer)) {
      await draw_board(conn, buffer);
    }
  }
};

await main();
