const readline = require('readline');
const { printBoard, processMove } = require('./src/core');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function initializeGame() {
  const boardState = [
    ['+', '-', '+', '-', '+', '-', '+'],
    ['|', '.', '|', '.', '|', '.', '|'],
    ['+', '-', '+', '-', '+', '-', '+'],
    ['|', '.', '|', '.', '|', '.', '|'],
    ['+', '-', '+', '-', '+', '-', '+'],
    ['|', '.', '|', '.', '|', '.', '|'],
    ['+', '-', '+', '-', '+', '-', '+']
  ];

  const gameVariables = {
    currentPlayer: 'X',
    turn: 1
  };

  const playerState = [
    { player: 'X', moves: [] },
    { player: 'O', moves: [] }
  ];

  return { gameVariables, boardState, playerState };
}

function displayGameBoard(boardState) {
  console.log('\nCurrent Board:');
  console.log(printBoard(boardState));
}

function displayInstructions() {
  console.log('\n=== TIC TAC TOE ===');
  console.log('Enter your move as "row,col" (e.g., "0,1" for row 0, column 1)');
  console.log('Board positions are numbered 0-2 for both rows and columns');
  console.log('Type "quit" to exit the game\n');
}

function getPlayerMove(gameVariables, callback) {
  rl.question(`Player ${gameVariables.currentPlayer}, enter your move (row,col): `, (input) => {
    if (input.toLowerCase() === 'quit') {
      console.log('Thanks for playing!');
      rl.close();
      return;
    }

    const parts = input.trim().split(',');
    if (parts.length !== 2) {
      console.log('Invalid format! Please enter as "row,col" (e.g., "0,1")');
      getPlayerMove(gameVariables, callback);
      return;
    }

    const row = parseInt(parts[0].trim());
    const col = parseInt(parts[1].trim());

    if (isNaN(row) || isNaN(col)) {
      console.log('Invalid input! Please enter numbers only.');
      getPlayerMove(gameVariables, callback);
      return;
    }

    callback([row, col]);
  });
}

function gameLoop(gameVariables, boardState, playerState) {
  displayGameBoard(boardState);
  
  getPlayerMove(gameVariables, (move) => {
    try {
      const result = processMove(gameVariables, boardState, playerState, move);
      gameVariables = result.gameVariables;
      boardState = result.boardState;
      playerState = result.playerState;

      console.log(`\nMove accepted! Turn ${gameVariables.turn - 1} complete.`);
      
      // Continue the game loop
      gameLoop(gameVariables, boardState, playerState);
      
    } catch (error) {
      console.log(`Error: ${error.message}`);
      console.log('Please try again.');
      
      gameLoop(gameVariables, boardState, playerState);
    }
  });
}

function startGame() {
  displayInstructions();
  const { gameVariables, boardState, playerState } = initializeGame();
  gameLoop(gameVariables, boardState, playerState);
}

// Handle cleanup on exit
process.on('SIGINT', () => {
  console.log('\nGame interrupted. Thanks for playing!');
  rl.close();
  process.exit(0);
});

startGame();
