const {getLines} = require('./common');

function part1(input) {
  const lines = getLines(input);

  let sum = 0;

  for (const line of lines) {
    const [target, ...numbers] = line.split(':').map(part => part.trim().split(' ').map(Number));
    if (isReachable(target[0], numbers[0])) {
      sum += target[0];
    }
  }

  return sum;
}

function isReachable(target, numbers) {
   function helper(current, index) {
      if (index === numbers.length) {
         return current === target;
      }


      return (
         helper(current + numbers[index], index + 1) ||
         helper(current * numbers[index], index + 1)
      );
   }

   return helper(numbers[0], 1); // Start with the first number and process the rest
}

function isReachable2(target, numbers) {
   function helper(current, index) {
      if (index === numbers.length) {
         return current === target;
      }


      return (
         helper(current + numbers[index], index + 1) ||
         helper(current * numbers[index], index + 1) ||
         helper(Number(`${current}${numbers[index]}`), index + 1)
      );
   }

   return helper(numbers[0], 1); // Start with the first number and process the rest
}

function part2(input) {
   const lines = getLines(input);

   let sum = 0;

   for (const line of lines) {
      const [target, ...numbers] = line.split(':').map(part => part.trim().split(' ').map(Number));
      if (isReachable2(target[0], numbers[0])) {
         sum += target[0];
      }
   }

   return sum;
}

module.exports = { part1, part2 };
