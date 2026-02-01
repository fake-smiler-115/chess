import { describe, it } from "@std/testing/bdd";
import { assertEquals } from "@std/assert";
import {
  bishopPossibleMoves,
  forwardPossibleMoves,
  pawnPossibleMoves,
  rookPossibleMoves,
  verticalPossibleMoves,
} from "../src/check_possible_moves.js";

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

describe("checking the possible moves of the rook", () => {
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

  it("1. vertical is free", () => {
    const result = verticalPossibleMoves(board, 7, 7, "white", [], -1);
    const expectedResult = [[0, 7], [1, 7], [2, 7], [3, 7], [4, 7], [5, 7], [
      6,
      7,
    ]].reverse();
    assertEquals(result, expectedResult);
  });

  it("3.. vertical is rigth", () => {
    const result = verticalPossibleMoves(board, 7, 4, "white", [], 1);
    const expectedResult = [[5, 7], [6, 7], [7, 7]];
    assertEquals(result, expectedResult);
  });

  it("2. rook is in miidle ", () => {
    const result = rookPossibleMoves(board, 4, 7, "white");
    const expectedResult = [[3, 7], [2, 7], [1, 7], [0, 7], [5, 7], [6, 7], [
      7,
      7,
    ]];
    assertEquals(result, expectedResult);
  });

  it("4. rook is in miidle of the board ", () => {
    const result = rookPossibleMoves(board, 4, 4, "white");
    const expectedResult = [
      [4, 3],
      [4, 2],
      [4, 1],
      [4, 5],
      [3, 4],
      [2, 4],
      [1, 4],
      [0, 4],
      [5, 4],
      [6, 4],
      [7, 4],
    ];
    assertEquals(result, expectedResult);
  });

  it("5. rook is in others kingdom", () => {
    const result = rookPossibleMoves(board, 1, 0, "white");
    const expectedResult = [[1, 1], [0, 0], [2, 0], [3, 0], [4, 0], [5, 0], [
      6,
      0,
    ], [7, 0]];
    assertEquals(result, expectedResult);
  });
});

describe("checking the bishop possible positions", () => {
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

  it("1. bishop at the starting positions", () => {
    const result = bishopPossibleMoves(board, 2, 7, "white");
    const expectedResult = [];
    assertEquals(result, expectedResult);
  });

  it('2. checking the forward right positions', () => {
    const possibleMoves = [];
    forwardPossibleMoves(board, 4,4,'white', possibleMoves, -1 , 1);
    const expectedResult = [[5,3],[6,2],[7,1]];
    assertEquals(possibleMoves, expectedResult);
  })

  it('3. bishop in the middle of the grid', () => {
    const result = bishopPossibleMoves(board, 4, 4, "white");
    const expectedResult = [[3,3],[2,2],[1,1],[5,3],[6,2],[7,1],[3,5],[5,5]];
    assertEquals(result, expectedResult);
  });

  it('4. bishop is in right corner 4 ,7', () => {
    const result = bishopPossibleMoves(board, 7,4, "white");
    const expectedResult = [[6,3],[5,2],[4,1],[6,5]];
    assertEquals(result, expectedResult);
  });
});
