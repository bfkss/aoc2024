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

const startPos = JSON.parse(JSON.stringify(position))
console.log('starting at ', startPos)

// const lastThree: Position[] = new Array(3)

function guard() {
  while (!position.leaving) {
    switch (position.facing) {
      // north
      case '^': {
        if (position.y === 0) {
          position.leaving = true
          break
        }
        const next = parsedInput[position.y - 1][position.x]
        if (next !== '#') {
          parsedInput[position.y] = parsedInput[position.y]
            .split('')
            .toSpliced(position.x, 1, 'X')
            .join('')
          position.y--
        } else {
          position.facing = Direction.East
        }
        break
      }

      // south
      case 'v': {
        if (position.y === maxY) {
          position.leaving = true
          break
        }
        const next = parsedInput[position.y + 1][position.x]
        if (next !== '#') {
          parsedInput[position.y] = parsedInput[position.y]
            .split('')
            .toSpliced(position.x, 1, 'X')
            .join('')
          position.y++
        } else {
          position.facing = Direction.West
          break
        }
        break
      }

      // east
      case '>': {
        if (position.x === maxX) {
          position.leaving = true
          break
        }
        const next = parsedInput[position.y][position.x + 1]
        if (next !== '#') {
          parsedInput[position.y] = parsedInput[position.y]
            .split('')
            .toSpliced(position.x, 1, 'X')
            .join('')
          position.x++
        } else {
          position.facing = Direction.South
          break
        }
        break
      }

      // west
      case '<': {
        if (position.x === 0) {
          position.leaving = true
          break
        }
        const next = parsedInput[position.y][position.x - 1]
        if (next !== '#') {
          parsedInput[position.y] = parsedInput[position.y]
            .split('')
            .toSpliced(position.x, 1, 'X')
            .join('')
          position.x--
        } else {
          position.facing = Direction.North
          break
        }
        break
      }
    }

    // lastThree.push(position)
    // lastThree.shift()
  }
  parsedInput[position.y] = parsedInput[position.y]
    .split('')
    .toSpliced(position.x, 1, 'X')
    .join('')
}

guard()
console.log('final position ', position)
Deno.writeTextFile('./output', parsedInput.join('\n'))
