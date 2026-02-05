import { bgRgb24, black, red} from "jsr:@std/fmt/colors";
const pieces = {
  "pawn": "♟️",
  "rook": "♜".padEnd(2),
  "knight": "♘".padEnd(2),
  "bishop": "♝".padEnd(2),
  "queen": "♕".padEnd(2),
  "king": "♔".padEnd(2),
  "p": "🔵",
};

const getPiecesSymbol = (name, color) => {
  if (color === "black") {
    return black (pieces[name]);
  }
  return  red(pieces[name])
};

const getSymbol = (char, value) => {
  if (char === " ") {
    return value % 2 === 0
      ? bgRgb24("  ", {r:245, g:236, b:219})
      : bgRgb24("  ", {r:140, g:105, b:70});
  }
  const symbol = getPiecesSymbol(char.name,char.playerColor);
  return value % 2 === 0
    ? bgRgb24(symbol, {r:245, g:236, b:219})
    : bgRgb24(symbol, {r:140, g:105, b:70});
};

export const drawBoard = (board) => {
  let stringBoard = "";

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const symbol = getSymbol(board[i][j], i + j);
      stringBoard += symbol;
    }
    stringBoard += "\n";
  }
  console.clear();
  console.log(stringBoard);
};
