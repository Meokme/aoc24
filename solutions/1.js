function getLists(input)
{
   const lines = require('./common').getLines(input);
   const list1 = [];
   const list2 = [];

   lines.forEach(line =>
                 {
                    const [num1, num2] = line.split('   ').map(Number);
                    list1.push(num1);
                    list2.push(num2);
                 });

   return [list1, list2];
}

function part1(input)
{
   const [list1, list2] = getLists(input);
   list1.sort();
   list2.sort();

   let solution = 0;
   for (let i = 0; i < list1.length; i++)
   {
      solution += Math.abs(list1[i] - list2[i]);
   }

   return solution;
}

function count(list2, num)
{
   return list2.filter(n => n === num).length;
}

function part2(input)
{
   const [list1, list2] = getLists(input);
   const map            = new Map();

   let solution = 0;

   list1.forEach(num =>
                 {
                    if (!map.has(num))
                    {
                       map.set(num, count(list2, num));
                    }
                    solution += map.get(num) * num;
                 });

   return solution;
}

module.exports = {part1, part2};