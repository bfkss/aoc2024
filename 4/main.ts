const input = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`
const parsedInput = input.split('\n')

const fw = /xmas/ig
const bw = /samx/ig
let count = 0
// forward XMAS in a row
for (const line of parsedInput) {
  const matchFw = line.matchAll(fw)
  const matchBw = line.matchAll(bw)
  // if (matchFw || matchBw) {
  //   console.log([...matchFw])
  //   console.log([...matchBw])
  // }
  count += [...matchFw].length
  count += [...matchBw].length
}
console.log(count)
// flip matrix
let flipped: string[][] = [[]]
for (let l = 0; l < parsedInput.length; l++) {
  const line = parsedInput[l].split('')
  for (let c = 0; c < line.length; c++) {
    flipped[c].push(line[c])
  }
}
console.log(flipped)

// backward XMAS in a row
// top-down
// bottom-up
// diagonal
