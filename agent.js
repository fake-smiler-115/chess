import { drawBoard } from "./src/draw_board.js";
import { readPositions } from "./src/read_positions.js";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

const init = async() => {
    const conn = await Deno.connect({
    port: 8000,
    transport: "tcp",
  });
  return conn;
}

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
  await conn.write(encoder.encode(JSON.stringify(result)));
};

const draw_board = async (conn, buffer) => {
  const n = await conn.read(buffer);
  const board = JSON.parse(decoder.decode(buffer.slice(0, n)));
  drawBoard(board);
};

const readAndWritePositions = async (conn, board, color) => {
  const result = await getThePositions(board, color);
  await conn.write(encoder.encode(JSON.stringify(result)));
  return result;
};

const handler = async (conn, buffer) => {
const n = await conn.read(buffer);
  const [board, color] = JSON.parse(decoder.decode(buffer.slice(0, n)));
  if (board !== 'won') {
    return await readAndWritePositions(conn, board, color);
  }
  return ['won', color];
}

const startGame = async(conn, buffer) => {
while (true) {
    await draw_board(conn, buffer);
    const [status, color] = await handler(conn, buffer);
    if (status === 'won') return color;
    if (!status) continue;
    await draw_board(conn, buffer);
    await readPlacePositons(conn);
    await draw_board(conn, buffer);
  }
}

const main = async () => {
  const conn = await init();
  const buffer = new Uint8Array(10000);
  await draw_board(conn, buffer);
 const color =  await startGame(conn, buffer);
 console.log('winner is ', color);
 conn.close();
};

await main();
