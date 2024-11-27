/** @type import(".").NS */
let ns = null;

export async function main(_ns) {
  ns = _ns;

  let originalBoard = [];
  let board = ns.go.getBoardState();
  board.forEach(c => ns.tprintf(`${c}`));

  /* let validMoves = ns.go.analysis.getValidMoves(board, originalBoard);
  validMoves.forEach(c => ns.tprintf(`${c}`)); */
  let liberties = ns.go.analysis.getLiberties(board);
  liberties.forEach(c => ns.tprintf(`${c}`));
}
