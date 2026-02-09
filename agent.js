
import { drawBoard } from "./src/draw_board.js";
import { readPositions } from "./src/read_positions.js";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const boardStyle = 0;
// Math.round( Math.random() * 3)

const init = async () => {
  const conn = await Deno.connect({
    port: 8000,
    transport: "tcp",
  });
  return conn;
};

export const isvalidMove = (board, col, row, color) => {
  try {
    if (board[row][col].playerColor === color) return true;
    return false;
  } catch {return false;}
};

const getThePositions = async (board, color, defaultColor) => {
  const [col, row] = await readPositions(defaultColor);
  const isValid = isvalidMove(board, col, row, color);
  if (!isValid) {
    console.log("invalid piece");
    return [false];
  }
  return [true, col, row];
};

const readPlacePositons = async (conn, color) => {
  const result = await readPositions(color);
  await conn.write(encoder.encode(JSON.stringify(result)));
};

const fetchBoardAndDraw = async (conn, buffer, color) => {
  const n = await conn.read(buffer);
  const board = JSON.parse(decoder.decode(buffer.slice(0, n)));
  drawBoard(board, color, boardStyle);
  console.log(n);
};

const readAndWritePositions = async (conn, board, color, defaultColor) => {
  const result = await getThePositions(board, color, defaultColor);
  await conn.write(encoder.encode(JSON.stringify(result)));
  return result;
};

const handler = async (conn, buffer, defaultColor) => {
  const n = await conn.read(buffer);
  const [board, color] = JSON.parse(decoder.decode(buffer.slice(0, n)));
  if (board !== "won") {
    return await readAndWritePositions(conn, board, color, defaultColor);
  }
  return ["won", color];
};

const playGame = async (conn, buffer, color) => {
  while (true) {
    await fetchBoardAndDraw(conn, buffer, color);
    console.log('Your turn now : ', color);
    const [status, winner] = await handler(conn, buffer, color);
    if (status === "won") return winner;
    if (!status) continue;
    await fetchBoardAndDraw(conn, buffer, color);
    await readPlacePositons(conn, color);
    await fetchBoardAndDraw(conn, buffer, color);
    console.log('waiting for other player to move .....');
  }
};

const getBoardAndColor = async(conn, buffer) => {
  const n = await conn.read(buffer);
  const  response = JSON.parse(decoder.decode(buffer.slice(0, n)));
  return response;
}

const main = async () => {
  const conn = await init();
  const buffer = new Uint8Array(10000);
  console.log('Waiting for other player .......');
  const [board, color] = await getBoardAndColor(conn, buffer);
  drawBoard(board, color, boardStyle);
  const winner = await playGame(conn, buffer, color);
  console.log("winner is ", winner);
  conn.close();
};

await main();