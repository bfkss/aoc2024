const input = await Deno.readTextFile('./input')
const parsedInput: string[] = input.split('\n')
parsedInput.pop()
const maxX = parsedInput[0].length - 1
const maxY = parsedInput.length - 1

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

function walkNorth() {
  for (let y = position.y; y >= 0; y--) {
    if (y === 0) {
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
    } else {
      position.y = y
      position.facing = Direction.East
      // position.leaving = true
      // parsedInput[position.y] = parsedInput[position.y]
      //   .split('')
      //   .toSpliced(position.x, 1, position.facing)
      //   .join('')
      break
    }
  }
}

function walkSouth() {
  for (let y = position.y; y <= maxY; y++) {
    if (y === maxY) {
      position.y = y
      position.leaving = true
      break
    }
    const next = parsedInput[y + 1][position.x]
    if (next !== '#') {
      parsedInput[y] = parsedInput[y].split('').toSpliced(position.x, 1, 'X')
        .join('')
    } else {
      position.y = y
      position.facing = Direction.West
      // position.leaving = true
      // parsedInput[position.y] = parsedInput[position.y]
      //   .split('')
      //   .toSpliced(position.x, 1, position.facing)
      //   .join('')
      break
    }
  }
}

function walkEast() {
  for (let x = position.x; x <= maxX; x++) {
    if (x === maxX) {
      position.x = x
      position.leaving = true
      break
    }
    const next = parsedInput[position.y][x + 1]
    if (next !== '#') {
      parsedInput[position.y] = parsedInput[position.y]
        .split('')
        .toSpliced(x, 1, 'X')
        .join('')
    } else {
      position.x = x
      position.facing = Direction.South
      // position.leaving = true
      // parsedInput[position.y] = parsedInput[position.y]
      //   .split('')
      //   .toSpliced(position.x, 1, position.facing)
      //   .join('')
      break
    }
  }
}

function walkWest() {
  for (let x = position.x; x >= 0; x--) {
    if (x === 0) {
      position.x = x
      position.leaving = true
      break
    }
    const next = parsedInput[position.y][x - 1]
    if (next !== '#') {
      parsedInput[position.y] = parsedInput[position.y].split('').toSpliced(
        x,
        1,
        'X',
      ).join('')
    } else {
      position.x = x
      position.facing = Direction.North
      // position.leaving = true
      // parsedInput[position.y] = parsedInput[position.y]
      //   .split('')
      //   .toSpliced(position.x, 1, position.facing)
      //   .join('')
      break
    }
  }
}

function* go() {
  while (!position.leaving) {
    yield walkNorth()
    yield walkEast()
    yield walkSouth()
    yield walkWest()
  }
  parsedInput[position.y] = parsedInput[position.y]
    .split('')
    // .toSpliced(position.x, 1, position.facing)
    .toSpliced(position.x, 1, 'X')
    .join('')
}
go().forEach(() => {})
// console.log(position, parsedInput)
console.log('final position ', position)
let distinct = 0
for (const line of parsedInput) {
  for (const char of line) {
    if (char === 'X') {
      distinct++
    }
  }
}
console.log(distinct)

Deno.writeTextFile('./output', parsedInput.join('\n'))
