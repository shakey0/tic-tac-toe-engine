const getPatternCoordinates = require('./getPatternCoordinates');

function getPatternBounds(coords) {
  const rows = coords.map(coord => coord[0]);
  const cols = coords.map(coord => coord[1]);
  
  return {
    minRow: Math.min(...rows),
    maxRow: Math.max(...rows),
    minCol: Math.min(...cols),
    maxCol: Math.max(...cols),
    width: Math.max(...cols) - Math.min(...cols) + 1,
    height: Math.max(...rows) - Math.min(...rows) + 1
  };
}

function getNewPatterns(winPatterns, currentPlayer, playerBoard, move) {
  const boardWidth = playerBoard[0].length;
  const boardHeight = playerBoard.length;
  const [moveRow, moveCol] = move;

  const newPatterns = [];
  
  for (const pattern of winPatterns) {
    const coordinates = getPatternCoordinates(pattern);
    
    for (const coords of coordinates) {
      const bounds = getPatternBounds(coords);
      // console.log(`Checking pattern: ${pattern} with bounds:`, bounds);
      
      // Generate all possible offsets where this pattern could be placed such that it would contain the current move
      for (let offsetRow = moveRow - bounds.maxRow; offsetRow <= moveRow - bounds.minRow; offsetRow++) {
        for (let offsetCol = moveCol - bounds.maxCol; offsetCol <= moveCol - bounds.minCol; offsetCol++) {
          
          // Calculate the actual board positions for this pattern placement
          const actualCoords = coords.map(([r, c]) => [r + offsetRow, c + offsetCol]);
          
          // Check if all coordinates are within board bounds
          const withinBounds = actualCoords.every(([r, c]) => 
            r >= 0 && r < boardHeight && c >= 0 && c < boardWidth
          );
          
          if (!withinBounds) continue;
          
          // Check if the current move is part of this pattern placement
          const containsMove = actualCoords.some(([r, c]) => r === moveRow && c === moveCol);
          
          if (!containsMove) continue;
          
          // Check if all positions in the pattern belong to the current player
          const allMatch = actualCoords.every(([r, c]) => playerBoard[r][c] === currentPlayer);
          
          if (allMatch) {
            newPatterns.push({
              pattern: pattern,
              coordinates: actualCoords,
              patternIndex: coordinates.indexOf(coords)
            });
          }
        }
      }
    }
  }
  
  return newPatterns;
}


const board = [
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '.', '.', '.', '.', '.', 'X', 'X', 'X', '.'],
  ['.', '.', '.', '.', '.', 'X', 'X', 'X', 'X', '.'],
  ['.', '.', '.', '.', '.', '.', 'X', 'O', 'O', '.'],
  ['.', '.', '.', '.', '.', 'X', '.', 'X', '.', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
];

const winPatterns = ['square1', 'square2', 'line3', 'line4', 'line5'];
const move = [6, 7];
const currentPlayer = 'X';

const result = getNewPatterns(winPatterns, currentPlayer, board, move);
console.dir(result, { depth: null });
