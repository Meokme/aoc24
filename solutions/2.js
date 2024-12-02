const { getLines } = require('./common');

const part1 = input => getLines(input).filter(report => isSafe(getLevels(report))).length;
const part2 = input => getLines(input).filter(report => {
  const levels = getLevels(report);
  return isSafe(levels) || levels.some((_, i) => isSafe(levels.slice(0, i).concat(levels.slice(i + 1))));
}).length;

const getLevels = report => report.split(' ').map(Number);

const isSafe = levels => {
  const isIncreasing = levels.every((val, i, arr) => i === 0 || val >= arr[i - 1]);
  const isDecreasing = levels.every((val, i, arr) => i === 0 || val <= arr[i - 1]);
  const isValidDifference = levels.every((val, i, arr) => i === 0 || Math.abs(val - arr[i - 1]) >= 1 && Math.abs(val - arr[i - 1]) <= 3);
  return (isIncreasing || isDecreasing) && isValidDifference;
};

module.exports = { part1, part2 };
