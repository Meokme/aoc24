const {getLines} = require('./common');

function findGuardPosition(lines)
{
   for (let row = 0; row < lines.length; row++)
   {
      const line = lines[row];
      const col = line.indexOf("^")+1 || line.indexOf("v")+1 || line.indexOf("<")+1 || line.indexOf(">")+1;
      if (col)
      {
         return [row, col-1];
      }
   }
   return [0, 0];
}

function turnRight(direction)
{
   const directions = {'>':'v', 'v':'<', '<':'^', '^':'>'};
   return directions[direction];
}

function moveGuard(guardPosition, guard, lines)
{
   const directions = {'v':[1, 0], '>':[0, 1], '^':[-1, 0], '<':[0, -1]}
   let move       = directions[guard];
   let nextRow = guardPosition[0] + move[0];
   let nextCol = guardPosition[1] + move[1];
   while (lines[nextRow]?.[nextCol] === '#')
   {
      guard = turnRight(guard);
      move = directions[guard];
      nextRow = guardPosition[0] + move[0];
      nextCol = guardPosition[1] + move[1];
   }
   return [[nextRow, nextCol], guard];
}

function part1(input) {
   const lines = getLines(input);
   let guardPosition = findGuardPosition(lines);
   let guard = lines[guardPosition[0]][guardPosition[1]];
   const positions           = new Set();
   while (lines[guardPosition[0]]?.[guardPosition[1]])
   {
      positions.add(guardPosition.join(','));
      const [nextPos, nextGuard] = moveGuard(guardPosition, guard, lines);
      guardPosition = nextPos;
      guard = nextGuard;
   }
   return positions.size;
}

function guardStuckInLoop(lines)
{
   let guardPosition = findGuardPosition(lines);
   let guard = lines[guardPosition[0]][guardPosition[1]];
   const visited           = new Set();

   while (lines[guardPosition[0]]?.[guardPosition[1]]) {
      const positionKey = `${guardPosition.join(',')},${guard}`; // 46,111,^
      if (visited.has(positionKey)) {
         console.log('stuck in loop at', guardPosition, guard);
         return true;
      }
      visited.add(positionKey);
      const [nextPos, nextGuard] = moveGuard(guardPosition, guard, lines);
      guardPosition = nextPos;
      guard = nextGuard;
   }

   return false;
}

function part2(input) {
   const lines = getLines(input).map(line => line.split(''));
   const guardPosition = findGuardPosition(lines);
   let sum = 0;
   for (let i = 0; i < lines.length; i++)
   {
      for (let j = 0; j < lines[i].length; j++)
      {
         if (lines[i][j] !== '#' && (guardPosition[0] !== i || guardPosition[1] !== j))
         {
            lines[i][j] = '#';
            sum += guardStuckInLoop(lines) ? 1 : 0;
            lines[i][j] = '.';
         }
      }
   }
   return sum;
}

module.exports = { part1, part2 };