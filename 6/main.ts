const input = await Deno.readTextFile('./input')
const parsedInput: string[] = input.split('\n')
parsedInput.pop()

const Direction = {
  North: '^',
  South: 'v',
  West: '<',
  East: '>',
} as const

type Position = {
  x: number
  y: number
  facing: '^' | 'v' | '>' | '<'
  leaving: boolean
}
let position: Position = {
  x: -1,
  y: -1,
  facing: Direction.North,
  leaving: false,
}

// find starting position
for (let y = 0; y < parsedInput.length; y++) {
  const row = parsedInput[y]
  for (let x = 0; x < row.length; x++) {
    if (row[x] === position.facing) {
      position = {
        ...position,
        x,
        y,
      }
      break
    }
  }
}

console.log('starting at ', position)

// return end position
function walkUp() {
  for (let y = position.y; y >= 0; y--) {
    const current = parsedInput[y][position.x]
    if (y === 0) {
      // if (y === 0 && current !== '#') {
      position.y = y
      position.leaving = true
      break
    }
    const next = parsedInput[y - 1][position.x]
    if (next !== '#') {
      parsedInput[y] = parsedInput[y]
        .split('')
        .toSpliced(position.x, 1, 'X')
        .join('')
      parsedInput[y - 1] = parsedInput[y - 1]
        .split('')
        .toSpliced(position.x, 1, position.facing)
        .join('')
    } else {
      position.y = y
      position.facing = Direction.East
      break
    }
  }
}
walkUp()
console.log(position, parsedInput)
