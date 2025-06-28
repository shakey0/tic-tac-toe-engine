function getPatternCoordinates(pattern) {
  switch (pattern) {
    case 'line3':
      return [
        [[0, 0], [0, 1], [0, 2]],
        [[0, 0], [1, 0], [2, 0]],
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
      ];
    case 'line4':
      return [
        [[0, 0], [0, 1], [0, 2], [0, 3]],
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[0, 0], [1, 1], [2, 2], [3, 3]],
        [[0, 3], [1, 2], [2, 1], [3, 0]]
      ];
    case 'line5':
      return [
        [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
        [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
        [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
        [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]]
      ];
    case 'square1':
      return [
        [[0, 0], [0, 1], [1, 0], [1, 1]]
      ];
    case 'square2':
      return [
        [[0, 0], [0, 2], [2, 0], [2, 2]]
      ];
    case 'square3':
      return [
        [[0, 0], [0, 3], [3, 0], [3, 3]]
      ];
    case 'square4':
      return [
        [[0, 0], [0, 4], [4, 0], [4, 4]]
      ];
    case 'square5':
      return [
        [[0, 0], [0, 5], [5, 0], [5, 5]]
      ];
    default:
      throw new Error(`Unknown pattern: ${pattern}`);
  }
}

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
      console.log(`Checking pattern: ${pattern} with bounds:`, bounds);
      
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
console.log('Found patterns:', result);
