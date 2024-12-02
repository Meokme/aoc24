const fs = require('fs');
const readline = require('readline');

const askPuzzle = () => new Promise(resolve => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Which puzzle do you want to solve? ', answer => {
    rl.close();
    resolve(answer);
  });
});

const readInput = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) reject(err);
    else resolve(data);
  });
});

const main = async () => {
  try {
    const puzzle = await askPuzzle();
    const input = await readInput(`inputs/${puzzle}.txt`);
    const solution = require(`./solutions/${puzzle}.js`);
    console.log('Solution 1:', solution.part1(input));
    console.log('Solution 2:', solution.part2(input));
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
