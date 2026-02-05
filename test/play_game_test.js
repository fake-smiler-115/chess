import { describe, it } from "@std/testing/bdd";
import { isvalidMove } from "../src/play_game.js";
import { assertEquals } from "@std/assert/equals";
import { allColorPieces, oppositeKingPosition } from "../src/checkMates.js";

describe("checking it is valid move ", () => {
  const board = Array.from(
    { length: 8 },
    () => Array.from({ length: 8 }).fill(" "),
  );

  board[1] = Array.from(
    { length: 8 },
    () => ({ playerColor: "black", name: "pawn" }),
  );
  board[6] = Array.from(
    { length: 8 },
    () => ({ playerColor: "white", name: "pawn" }),
  );

  it("1. checking  the pawns valid", () => {
    const result = isvalidMove(board, 2, 6, "white");
    assertEquals(result, true);
  });

  it("2. checking  black  pawns valid", () => {
    const result = isvalidMove(board, 2, 1, "black");
    assertEquals(result, true);
  });
  it("3. selecting the invalid pieces", () => {
    const result = isvalidMove(board, 2, 6, "black");
    assertEquals(result, false);
  });
});

describe("checking the all the pieces of the color", () => {
  const board = Array.from(
    { length: 8 },
    () => Array.from({ length: 8 }).fill(" "),
  );

  board[1] = Array.from(
    { length: 8 },
    () => ({ playerColor: "black", name: "pawn" }),
  );
  board[6] = Array.from(
    { length: 8 },
    () => ({ playerColor: "white", name: "pawn" }),
  );

  it("1. listing all the white pawns ", () => {
    const result = allColorPieces(board, "white");
    const expectedResult = [
      [0, 6, "pawn"],
      [1, 6, "pawn"],
      [2, 6, "pawn"],
      [3, 6, "pawn"],
      [4, 6, "pawn"],
      [5, 6, "pawn"],
      [6, 6, "pawn"],
      [7, 6, "pawn"],
    ];
    assertEquals(result, expectedResult);
  });

  it("2. listing all the black pawns ", () => {
    const result = allColorPieces(board, "black");
    const expectedResult = [
      [0, 1, "pawn"],
      [1, 1, "pawn"],
      [2, 1, "pawn"],
      [3, 1, "pawn"],
      [4, 1, "pawn"],
      [5, 1, "pawn"],
      [6, 1, "pawn"],
      [7, 1, "pawn"],
    ];
    assertEquals(result, expectedResult);
  });
});

describe("getting the opposite king positions", () => {
  const board = Array.from(
    { length: 8 },
    () => Array.from({ length: 8 }).fill(" "),
  );

  board[1] = Array.from(
    { length: 8 },
    () => ({ playerColor: "black", name: "pawn" }),
  );
  board[6] = Array.from(
    { length: 8 },
    () => ({ playerColor: "white", name: "pawn" }),
  );
  board[0][4] = { playerColor: "black", name: "king" };
  board[7][4] = { playerColor: "white", name: "king" };

  it("1. getting the positons of the black king", () => {
    const result = oppositeKingPosition(board, "white");
    assertEquals(result, [4, 0]);
  });

  it("2. getting the positons of the white king", () => {
    const result = oppositeKingPosition(board, "black");
    assertEquals(result, [4, 7]);
  });

  it('3. king is in the middle of the board', () => {
  board[7][4] = ' ';
  board[4][4] = { playerColor: "white", name: "king" };
  const result = oppositeKingPosition(board, "black");
    assertEquals(result, [4, 4]);
  })
});
