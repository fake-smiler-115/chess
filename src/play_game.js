import { drawBoard } from "./draw_board.js";
import { readPositions } from "./read_positions.js";
const encoder = new TextEncoder();
const decoder = new TextDecoder();


const drawBluePoints = async (board, possibleMoves, conn) => {
  const dummyBoard= board.map(x => x.map(x => x));
  for (const move of possibleMoves) {
    const col = move[0];
    const row = move[1];
    dummyBoard[row][col] = {name : 'p'};
  }
  await conn.write(encoder.encode(JSON.stringify(dummyBoard)));
}

export const playGame = async (conn ,board, playerId, references, color) => {
  const buffer = new Uint8Array(10000);
  await conn.write(encoder.encode(JSON.stringify([board , color])));
  let n= await conn.read(buffer);
  const [isValid, col, row]  = JSON.parse(decoder.decode(buffer.slice(0,n)));
  console.log(isValid);
  
  if (!isValid) return false;

  const pieceName = board[row][col].name;
  const possibleMoves = references[pieceName](board, col, row, color);
  await drawBluePoints(board, possibleMoves,  conn);
   n = await conn.read(buffer);
  const [placeCol , placeRow]  = JSON.parse(decoder.decode(buffer.slice(0,n)));
  console.log(placeCol, placeRow);
  
  for (const move of possibleMoves) {
    if (move[0] === placeCol && move[1] === placeRow) {
      board[placeRow][placeCol] = board[row][col];
      board[row][col] = " ";
      playerId[0] = 1 - playerId[0];
      return true;
    }
  }
};
