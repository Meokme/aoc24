function parseInput(input) {
  const sections = input.split('\n\n');
  const rules = sections[0].split('\n').map(line => line.split('|').map(Number));
  const updates = sections[1].split('\n').map(line => line.split(',').map(Number));
  return { rules, updates };
}

function isValidUpdate(update, rules) {
  for (const [before, after] of rules) {
    if (update.includes(before) && update.includes(after)) {
      if (update.indexOf(before) > update.indexOf(after)) {
        return false;
      }
    }
  }
  return true;
}

function findMiddleNumber(update) {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
}

function orderUpdate(update, rules) {
   const orderedUpdate = update.slice();
   orderedUpdate.sort((a, b) => {
      for (const [before, after] of rules) {
         if (a === before && b === after) return -1;
         if (a === after && b === before) return 1;
      }
      return a - b;
   });
   return orderedUpdate;
}

function part1(input) {
  const { rules, updates } = parseInput(input);
  const validUpdates = updates.filter(update => isValidUpdate(update, rules));
   return validUpdates.reduce((sum, update) => sum + findMiddleNumber(update), 0);
}

function part2(input) {
   const { rules, updates } = parseInput(input);
   const incorrectUpdates = updates.filter(update => !isValidUpdate(update, rules));
   return incorrectUpdates.reduce((sum, update) =>
                                  {
                                     const orderedUpdate = orderUpdate(update, rules);
                                     return sum + findMiddleNumber(orderedUpdate);
                                  }, 0);
}

module.exports = { part1, part2 };