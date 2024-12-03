function part1(input) {
  const regex = /mul\((\d+),(\d+)\)/g;
  let sum = 0, match;

  while ((match = regex.exec(input)) !== null) {
    sum += Number(match[1]) * Number(match[2]);
  }

  return sum;
}

function part2(input) {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  let sum = 0, enabled = true, match;

  while ((match = regex.exec(input)) !== null) {
    if (match[0] === "do()") {
      enabled = true;
    } else if (match[0] === "don't()") {
      enabled = false;
    } else if (enabled) {
      sum += Number(match[1]) * Number(match[2]);
    }
  }

  return sum;
}

module.exports = { part1, part2 };