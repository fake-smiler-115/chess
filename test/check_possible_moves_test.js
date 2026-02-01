import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import { pawnPossibleMoves } from "../src/check_possible_moves.js";

describe("checking the moves of the pawn", () => {
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

  it("1 . pawn has no one to kill only one step forward", () => {
    const result = pawnPossibleMoves(board, 4, 4, "black");
    const expectedResult = [[4, 3]];
    assertEquals(result, expectedResult);
  });

  it(" 2. pawn has two side to kill", () => {
    const result = pawnPossibleMoves(board, 5, 2, "white");
    const expectedResult = [[4, 1], [6, 1]];
    assertEquals(result, expectedResult);
  });

  it("3. pawn has only one side to move", () => {
    const result = pawnPossibleMoves(board, 7, 2, "white");
    const expectedResult = [[6, 1]];
    assertEquals(result, expectedResult);
  });

  it("4. pawn adjacents are it teammeates", () => {
    const result = pawnPossibleMoves(board, 6, 7, "white");
    const expectedResult = [];
    assertEquals(result, expectedResult);
  });

  it("5. checking for the initial 2 steps of the pawn", () => {
    const result = pawnPossibleMoves(board, 6, 6, "white");
    const expectedResult = [[6, 5], [6, 4]];
    assertEquals(result, expectedResult);
  });
});
