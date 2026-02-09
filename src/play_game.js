const encoder = new TextEncoder();
const decoder = new TextDecoder();

const writeBluePoints = async (board, possibleMoves, conn) => {
  const dummyBoard = board.map((x) => x.map((x) => x));
  for (const move of possibleMoves) {
    const col = move[0];
    const row = move[1];
    dummyBoard[row][col] = { name: "p" };
  }
  await conn.write(encoder.encode(JSON.stringify(dummyBoard) + '\n'));
};

const writeBoard = async (conn, board, color) =>
  await conn.write(encoder.encode(JSON.stringify([board, color]) + '\n'));

const getThePositionValues = async (conn, buffer) => {
  const n = await conn.read(buffer);
  return JSON.parse(decoder.decode(buffer.slice(0, n)));
};

const swapIfPossible = (board, possibleMoves, playerId, values) => {
  const [col, row, placeCol, placeRow, pieceName, color] = values;
  for (const move of possibleMoves) {
    if (move[0] === placeCol && move[1] === placeRow) {
      board[placeRow][placeCol] = board[row][col];
      board[row][col] = " ";
      playerId[0] = 1 - playerId[0];
      // if (pieceName === 'pawn' &&  [0,7].includes(placeRow)) {
      //   const pieceName = prompt('select the piece');
      //   board[placeRow][placeCol] = { playerColor: color, name: pieceName };
      // }
      return true;
    }
  }

  return "unnessary return statement";
};

export const playTheMove = async (conn, board, playerId, references, color) => {
  const buffer = new Uint8Array(10000);
  await writeBoard(conn, board, color);
  const [isValid, col, row] = await getThePositionValues(conn, buffer);
  if (!isValid) return false;

  const pieceName = board[row][col].name;
  const possibleMoves = references[pieceName](board, col, row, color);
  await writeBluePoints(board, possibleMoves, conn);
  const position = await getThePositionValues(conn, buffer);
  return swapIfPossible(board, possibleMoves, playerId, [
    col,
    row,
    ...position,
    pieceName, color
  ] );
};
