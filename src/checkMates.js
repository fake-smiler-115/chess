export const allColorPieces = (board, color) => {
  const pieces = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].playerColor === color) {
        pieces.push([j, i, board[i][j].name]);
      }
    }
  }
  return pieces;
};

export const oppositeKingPosition = (board, pieceColor) => {
  let color = "white";
  if (pieceColor === "white") color = "black";
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].name === "king" && board[i][j].playerColor === color) {
        return [j, i];
      }
    }
  }
};

export const checkToKing = (board, color, references) => {
  const dummyBoard = board.map((x) => x.map((x) => x));
  const allPieces = allColorPieces(dummyBoard, color);
  const possibleMoves = allPieces.flatMap(([col, row, name]) =>
    references[name](dummyBoard, col, row, color)
  );
  const [kingCol, kingRow] = oppositeKingPosition(dummyBoard, color);
  return possibleMoves.filter(([col, row]) =>
    col === kingCol && row === kingRow
  )
    .length > 0;
};

export const isThereMoves = (board, color, references, otherColor) => {
  const boardAccordingColor = board.map((x) => x.map((x) => x));
  const allPieces = allColorPieces(boardAccordingColor, color);
  for (const piece of allPieces) {
    const col = piece[0];
    const row = piece[1];
    const pieceName = boardAccordingColor[row][col].name;
    const possibleMoves = references[pieceName](
      boardAccordingColor,
      col,
      row,
      color,
    );
    for (const move of possibleMoves) {
      const dummyBoard = boardAccordingColor.map((x) => x.map((x) => x));
      const moveCol = move[0];
      const moveRow = move[1];
      const pieceDetails = dummyBoard[row][col];
      dummyBoard[row][col] = " ";
      dummyBoard[moveRow][moveCol] = pieceDetails;
      if (!checkToKing(dummyBoard, otherColor, references)) {
        return true;
      }
    }
  }
};
