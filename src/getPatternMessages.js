const mockPatterns = [
  {
    pattern: 'square1',
    coordinates: [ [ 5, 6 ], [ 5, 7 ], [ 6, 6 ], [ 6, 7 ] ],
    patternIndex: 0
  },
  {
    pattern: 'square1',
    coordinates: [ [ 5, 7 ], [ 5, 8 ], [ 6, 7 ], [ 6, 8 ] ],
    patternIndex: 0
  },
  {
    pattern: 'square2',
    coordinates: [ [ 6, 5 ], [ 6, 7 ], [ 8, 5 ], [ 8, 7 ] ],
    patternIndex: 0
  },
  {
    pattern: 'line3',
    coordinates: [ [ 6, 5 ], [ 6, 6 ], [ 6, 7 ] ],
    patternIndex: 0
  },
  {
    pattern: 'line3',
    coordinates: [ [ 6, 6 ], [ 6, 7 ], [ 6, 8 ] ],
    patternIndex: 0
  },
  {
    pattern: 'line3',
    coordinates: [ [ 5, 8 ], [ 6, 7 ], [ 7, 6 ] ],
    patternIndex: 3
  },
  {
    pattern: 'line3',
    coordinates: [ [ 6, 7 ], [ 7, 6 ], [ 8, 5 ] ],
    patternIndex: 3
  },
  {
    pattern: 'line4',
    coordinates: [ [ 6, 5 ], [ 6, 6 ], [ 6, 7 ], [ 6, 8 ] ],
    patternIndex: 0
  },
  {
    pattern: 'line4',
    coordinates: [ [ 5, 8 ], [ 6, 7 ], [ 7, 6 ], [ 8, 5 ] ],
    patternIndex: 3
  }
]

function numberToWords(num) {
  const words = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
  ];
  return words[num] || num.toString();
}

function getArticle(type, count) {
  switch (type) {
    case 'a':
      return count === 1 ? 'a' : numberToWords(count);
    case 'an':
      return count === 1 ? 'an' : numberToWords(count);
  }
}

function getPlural(type, count) {
  switch (type) {
    case 's':
      return count === 1 ? '' : 's';
    case 'es':
      return count === 1 ? '' : 'es';
    case 'ies':
      return count === 1 ? 'y' : 'ies';
  }
}

function getMessageForPattern(pattern, patternIndex, count) {
  switch (pattern) {
    case 'square1':
      return '{{player}} built ' + getArticle('a', count) + ' robust square' + getPlural('s', count) + '!';
    case 'square2': case 'square3': case 'square4': case 'square5': case 'square6': case 'square7': case 'square8':
      return '{{player}} discovered the magic corners of ' + getArticle('a', count) + ' almost invisible square' + getPlural('s', count) + '!';
    case 'line3': case 'line4': case 'line5': case 'line6': case 'line7': case 'line8': case 'line9':
      switch (patternIndex) {
        case 0:
          return '{{player}} lay down ' + getArticle('a', count) + ' perfectly horizontal line' + getPlural('s', count) + ' of ' + pattern.slice(-1) + '!';
        case 1:
          return '{{player}} hung ' + getArticle('a', count) + ' terrifyingly vertical line' + getPlural('s', count) + ' of ' + pattern.slice(-1) + '!';
        case 2:
          return '{{player}} drew ' + getArticle('a', count) + ' diagonal line' + getPlural('s', count) + ' of ' + pattern.slice(-1) + ' rising like the sun!';
        case 3:
          return '{{player}} sketched ' + getArticle('a', count) + ' diagonal line' + getPlural('s', count) + ' of ' + pattern.slice(-1) + ' representing a majestic sunset!';
        default:
          return '{{player}} created ' + getArticle('a', count) + ' mysterious line' + getPlural('s', count) + ' of ' + pattern.slice(-1) + '!';
      }
    default:
      return '';
  }
}

function getPatternMessages(patterns) {
  const messages = [];

  // Reduce patterns to unique patterns using the pattern and patternIndex with the number of times they appear
  const uniquePatterns = patterns.reduce((acc, { pattern, patternIndex }) => {
    const key = `${pattern}-${patternIndex}`;
    if (!acc[key]) {
      acc[key] = { pattern, patternIndex, count: 0 };
    }
    acc[key].count++;
    return acc;
  }, {});

  const uniquePatternsArray = Object.values(uniquePatterns);

  for (const { pattern, patternIndex, count } of uniquePatternsArray) {
    const message = getMessageForPattern(pattern, patternIndex, count);
    if (message) {
      messages.push({
        pattern,
        patternIndex,
        message: message
      });
    }
  }

  return messages;
}

console.log(getPatternMessages(mockPatterns));
