const { getLines } = require('./common');

function part1(input) {
  const rows = getLines(input);
  const numRows = rows.length;
  const numCols = rows[0].length;
  const word = 'XMAS';
  const wordLength = word.length;
  let count = 0;

  const isValidPosition = (row, col) => row >= 0 && col >= 0 && row < numRows && col < numCols;

  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1], // right, down, down-right, down-left
    [0, -1], [-1, 0], [-1, -1], [-1, 1] // left, up, up-left, up-right
  ];

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      for (const [rowDelta, colDelta] of directions) {
        let found = true;
        for (let charIndex = 0; charIndex < wordLength; charIndex++) {
          const newRow = row + rowDelta * charIndex;
          const newCol = col + colDelta * charIndex;
          if (!isValidPosition(newRow, newCol) || rows[newRow][newCol] !== word[charIndex]) {
            found = false;
            break;
          }
        }
        if (found) count++;
      }
    }
  }

  return count;
}

function part2(input) {
   const rows = getLines(input);
   const numRows = rows.length;
   const numCols = rows[0].length;
   let count = 0;

   const isValidPosition = (row, col) => row >= 0 && col >= 0 && row < numRows && col < numCols;
   const is = (row, col, char) => isValidPosition(row, col) && rows[row][col] === char;

   for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
         if (is(row, col, 'A') && (
            (is(row -1, col -1, 'M') && is(row -1, col +1, 'S') && is(row +1, col -1, 'M') && is(row +1, col +1, 'S')) ||
            (is(row -1, col -1, 'M') && is(row -1, col +1, 'M') && is(row +1, col -1, 'S') && is(row +1, col +1, 'S')) ||
            (is(row -1, col -1, 'S') && is(row -1, col +1, 'M') && is(row +1, col -1, 'S') && is(row +1, col +1, 'M')) ||
            (is(row -1, col -1, 'S') && is(row -1, col +1, 'S') && is(row +1, col -1, 'M') && is(row +1, col +1, 'M'))
         )) {
            count++;
         }
      }
   }

   return count;
}

module.exports = { part1, part2 };
