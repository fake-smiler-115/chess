// import { selectThePiece } from "./src/agent.js";
import { createBoard } from "./src/create_board_array.js";
import { drawBoard } from "./src/draw_board.js";

const main = () => {
  const board = createBoard();
  drawBoard(board);
  // selectThePiece();
}

main()