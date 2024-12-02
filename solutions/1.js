const { getLines } = require('./common');

const getLists = input => {
  const list1 = [], list2 = [];
  getLines(input).forEach(line => {
    const [num1, num2] = line.split('   ').map(Number);
    list1.push(num1);
    list2.push(num2);
  });
  return [list1, list2];
};

const part1 = input => {
  const [list1, list2] = getLists(input);
  list1.sort();
  list2.sort();
  return list1.reduce((sum, num, i) => sum + Math.abs(num - list2[i]), 0);
};

const count = (list, num) => list.filter(n => n === num).length;

const part2 = input => {
   const [list1, list2] = getLists(input);
   return list1.reduce((sum, num) => sum + count(list2, num) * num, 0);
};

module.exports = { part1, part2 };
