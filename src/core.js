// const gameVariables = {
//   boardSize: [3, 3],
//   winPatterns: ['line3'],
//   winRule: 'first',
//   currentPlayer: 'X',
//   turn: 3,
// };
// const boardState = [ // This is a 3x3 board (the strings with spaces are cell borders)
//   ['+', '-', '+', '-', '+', '-', '+'],
//   ['|', '.', '|', 'X', '|', '.', '|'],
//   ['+', '-', '+', '-', '+', '-', '+'],
//   ['|', '.', '|', '.', '|', '.', '|'],
//   ['+', '-', '+', '-', '+', '-', '+'],
//   ['|', '.', '|', 'O', '|', '.', '|'],
//   ['+', '-', '+', '-', '+', '-', '+']
// ]
// const playerState = [
//   { player: 'X', score: 0, moves: [[0, 1]], name: 'Player 1' },
//   { player: 'O', score: 0, moves: [[2, 1]], name: 'Player 2' }
// ];
// const move = [0, 2]


function printBoard(board) { // Solely for development purposes for visualizing the board in the terminal
  return '\n' + board.map(row => row.join(' ')).join('\n') + '\n';
}

function extractPlayerBoard(board) {
  return board.map(row => row.filter((cell, index) => index % 2 === 1)).filter((_, index) => index % 2 === 1);
}

function addPlayerBoardToBoard(boardState, playerBoard) {
  for (let i = 0; i < playerBoard.length; i++) {
    for (let j = 0; j < playerBoard[i].length; j++) {
      boardState[i * 2 + 1][j * 2 + 1] = playerBoard[i][j];
    }
  }
  return boardState;
}

function getNextPlayer(playerState, currentPlayer) {
  const currentIndex = playerState.findIndex(player => player.player === currentPlayer);
  return playerState[(currentIndex + 1) % playerState.length].player;
}

function processMove(gameVariables, boardState, playerState, move) {
  const playerBoard = extractPlayerBoard(boardState);
  const [row, col] = move;
  
  if (row < 0 || row >= playerBoard.length || col < 0 || col >= playerBoard[0].length) {
    throw new Error('Invalid move: out of bounds');
  }
  if (playerBoard[row][col] !== '.') {
    throw new Error('Invalid move: cell already occupied');
  }

  playerBoard[row][col] = gameVariables.currentPlayer;
  playerState.find(player => player.player === gameVariables.currentPlayer).moves.push(move);

  gameVariables.turn += 1;
  gameVariables.currentPlayer = getNextPlayer(playerState, gameVariables.currentPlayer);

  boardState = addPlayerBoardToBoard(boardState, playerBoard);

  return { gameVariables, boardState, playerState };
}

module.exports = {
  printBoard,
  processMove
};


// console.log(printBoard(boardState));
// const result = processMove(gameVariables, boardState, playerState, move);
// console.log(printBoard(result.boardState));
// console.log(result.gameVariables);
// console.log(result.playerState);
