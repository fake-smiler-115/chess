import { bgRgb24, rgb24} from "jsr:@std/fmt/colors";

const boardFilters = {
  0 : [{ r: 17, g: 17, b: 17 }, { r: 120, g: 120, b: 120 }, {r:245, g:236, b:219}, {r:140, g:105, b:70}],
  1 : [
  { r: 17,  g: 17,  b: 17  }, 
  { r: 255, g: 255, b: 255 },
  { r: 245, g: 222, b: 179 },
  { r: 139, g: 69,  b: 19  } 
],
2: [
  { r: 17,  g: 17,  b: 17  },
  { r: 250, g: 250, b: 250 },
  { r: 232, g: 243, b: 232 },
  { r: 92,  g: 122, b: 72  }
],
3 : [
  { r: 58,  g: 42,  b: 26  },
  { r: 255, g: 246, b: 229 },
  { r: 248, g: 237, b: 219 },
  { r: 165, g: 122, b: 85  }
],
  4 : [
  { r: 28,  g: 28,  b: 28  },
  { r: 245, g: 245, b: 245 },
  { r: 220, g: 220, b: 220 },
  { r: 120, g: 120, b: 120 }
],
  6 : [
  { r: 11,  g: 28,  b: 45  },
  { r: 249, g: 250, b: 247 },
  { r: 214, g: 224, b: 240 },
  { r: 78,  g: 105, b: 140 }
], 

5 : [
  { r: 234, g: 234, b: 234 }, 
  { r: 43,  g: 43,  b: 43  },  
  { r: 60,  g: 60,  b: 60  },
  { r: 30,  g: 30,  b: 30  }
],

}

const pieces = {
  "pawn": "♟".padEnd(2),
  "rook": "♜".padEnd(2),
  "knight": "♞".padEnd(2),
  "bishop": "♝".padEnd(2),
  "queen": "♕".padEnd(2),
  "king": "♔".padEnd(2),
  "p": "🔵",
};

const getPiecesSymbol = (name, color, option) => {
  if(name === undefined) return '  ';
  if (color === "black") {
    return  rgb24(pieces[name], boardFilters[option][0]) ;
  }
  return rgb24(pieces[name], boardFilters[option][1]); 
};

const getSymbol = (char, value, option) => {
  const symbol = getPiecesSymbol(char.name,char.playerColor, option);
  return value % 2 === 0
    ? bgRgb24(symbol, boardFilters[option][2])
    : bgRgb24(symbol, boardFilters[option][3]);
};

const reverseBaord = (board) => 
   board.map(row => row.map(x => x).reverse()).reverse();


export const drawBoard = (board, color, boardOption = 2) => {
  if (color === 'black') board = reverseBaord(board);
  let stringBoard = "";

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const symbol = getSymbol(board[i][j], i + j, boardOption);
      stringBoard += symbol;
    }
    stringBoard += "\n";
  }
  console.clear();
  console.log(stringBoard);
};
