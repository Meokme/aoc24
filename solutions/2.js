function part1(input)
{
   const lines = require('./common').getLines(input);

   return lines.filter(isReportSafe).length;
}

function isReportSafe(report) {
   const levels = report.split(' ').map(Number);
   return isSafe(levels);
}

function isSafe(levels)
{
   const isIncreasing      = levels.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
   const isDecreasing      = levels.every((val, i, arr) => i === 0 || val <= arr[i - 1]);
   const isValidDifference = levels.every((val, i, arr) => i === 0 || (Math.abs(val - arr[i - 1]) >= 1 && Math.abs(val - arr[i - 1]) <= 3));

   return (isIncreasing || isDecreasing) && isValidDifference;
}

function part2(input)
{
   const lines = require('./common').getLines(input);

   return lines.filter(isReportSafeWithDampener).length;
}

function isReportSafeWithDampener(report)
{
   const levels = report.split(' ').map(Number);
   if (isSafe(levels))
   {
      return true;
   }

   for (let i = 0; i < levels.length; i++)
   {
      const modifiedLevels = levels.slice(0, i).concat(levels.slice(i + 1));
      if (isSafe(modifiedLevels))
      {
         return true;
      }
   }

   return false;
}

module.exports = {part1, part2};
