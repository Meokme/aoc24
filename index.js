const fs = require('fs');
const readline = require('readline');

async function askPuzzle() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Which puzzle do you want to solve? ', (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function readInput(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function main() {
  try {
    const puzzle = await askPuzzle();
    const input = await readInput(`inputs/${puzzle}.txt`);
    const solution = require(`./solutions/${puzzle}.js`);
    const result1 = solution.part1(input);
    const result2 = solution.part2(input);
    console.log('Solution 1:', result1);
    console.log('Solution 2:', result2);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();