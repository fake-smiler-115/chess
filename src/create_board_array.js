const createPowerPieces = (
  color,
) => [
  { playerColor: color, name: "rook" },
  { playerColor: color, name: "knight" },
  { playerColor: color, name: "bishop" },
  { playerColor: color, name: "queen" },
  { playerColor: color, name: "king" },
  { playerColor: color, name: "bishop" },
  { playerColor: color, name: "knight" },
  { playerColor: color, name: "rook" },
];

const createPawns = (color) =>
  Array.from(
    { length: 8 },
    () => ({ playerColor: color, name: "pawn" }),
  );

export const createBoard = () => {
  const board = Array.from(
    { length: 8 },
    () => Array.from({ length: 8 }).fill(" "),
  );

  board[1] = createPawns("black");
  board[6] = createPawns("white");
  board[0] = createPowerPieces("black");
  board[7] = createPowerPieces("white");

  return board;
};
