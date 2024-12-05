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
const lines = input.split('\n')

function findXmas(text: string[]): number {
  const fw = /xmas/gi
  const bw = /samx/gi
  let count = 0
  // forward XMAS in a row
  for (const line of text) {
    const matchFw = line.matchAll(fw)
    const matchBw = line.matchAll(bw)
    // if (matchFw || matchBw) {
    //   console.log([...matchFw])
    //   console.log([...matchBw])
    // }
    count += [...matchFw].length
    count += [...matchBw].length
  }
  return count
}

// lines
console.log(findXmas(lines))

// rows
const flipped: string[] = []
for (let i = 0; i < lines[0].length; i++) {
  const newLine: string[] = []
  for (let j = 0; j < lines.length; j++) {
    newLine.push(lines[j][i])
  }
  flipped.push(newLine.join(''))
}

console.log(findXmas(flipped))

// diagonal TL to BR
const diag1: string[] = []
for (let i = 0; i < lines[0].length; i++) {
  const newDiagonal: string[] = []
  for (let j = 0; j < lines.length; j++) {
    newDiagonal.push(lines[j][])
  }
  diag1.push(newDiagonal.join(''))
}
// for (let i = 0; i < lines.length; i++) {
//   const newDiagonal: string[] = []
//   do {
//     newDiagonal.push(lines[i][i % lines[i].length])
//   } while (i % lines[i].length !== 0)
//   diag1.push(newDiagonal)
// }
console.log(diag1)

// diagonal TR to BL
