function groupByFrequency(antennas) {
   return antennas.reduce((acc, { x, y, frequency }) => {
      if (!acc[frequency]) acc[frequency] = [];
      acc[frequency].push({ x, y });
      return acc;
   }, {});
}

function isWithinBounds(map, { x, y }) {
   return x >= 0 && x < map.length && y >= 0 && y < map[0].length;
}

const getGroupedAntennas = (input) =>
{
   const map      = input.trim().split('\n').map(line => line.split(''));
   const antennas = [];

   // Collect all antenna positions with their frequencies
   for (let x = 0; x < map.length; x++)
   {
      for (let y = 0; y < map[x].length; y++)
      {
         if (map[x][y] !== '.')
         {
            antennas.push({x, y, frequency : map[x][y]});
         }
      }
   }

   // Group antennas by frequency
   const groupedByFrequency = groupByFrequency(antennas);
   return {map, groupedByFrequency};
};

function countAntinodes(input) {
   const {map, groupedByFrequency} = getGroupedAntennas(input);

   const antinodeSet = new Set();

   for (const antennaList of Object.values(groupedByFrequency)) {
      const len = antennaList.length;

      if (len < 2) continue;

      for (let i = 0; i < len; i++) {
         for (let j = i + 1; j < len; j++) {
            const a = antennaList[i];
            const b = antennaList[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;

            const antinode1 = { x: a.x - dx, y: a.y - dy };
            const antinode2 = { x: b.x + dx, y: b.y + dy };

            if (isWithinBounds(map, antinode1)) {
               antinodeSet.add(`${antinode1.x},${antinode1.y}`);
            }
            if (isWithinBounds(map, antinode2)) {
               antinodeSet.add(`${antinode2.x},${antinode2.y}`);
            }
         }
      }
   }

   return antinodeSet.size;
}

function countAntinodes2(input) {
   const {map, groupedByFrequency} = getGroupedAntennas(input);

   const antinodeSet = new Set();

   for (const antennaList of Object.values(groupedByFrequency)) {
      const len = antennaList.length;

      if (len < 2) continue;

      for (let i = 0; i < len; i++) {
         for (let j = i + 1; j < len; j++) {
            const a = antennaList[i];
            const b = antennaList[j];
            const dx = b.x - a.x;
            const dy = b.y - a.y;

            let antinode1 = { x: a.x + dx, y: a.y + dy };
            let antinode2 = { x: b.x - dx, y: b.y - dy };

            while (isWithinBounds(map, antinode1)) {
               antinodeSet.add(`${antinode1.x},${antinode1.y}`);
               antinode1 = { x: antinode1.x + dx, y: antinode1.y + dy };
            }
            while (isWithinBounds(map, antinode2))
            {
               antinodeSet.add(`${antinode2.x},${antinode2.y}`);
               antinode2 = {x : antinode2.x - dx, y : antinode2.y - dy};
            }
         }
      }
   }

   return antinodeSet.size;
}

function part1(input) {
  return countAntinodes(input);
}

function part2(input) {
  return countAntinodes2(input);
}

module.exports = { part1, part2 };
