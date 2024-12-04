const listOne: number[] = []
const listTwo: number[] = []

const input = await Deno.readTextFile('./input')
const parsedInput = input.split('\n')
parsedInput.pop()!
parsedInput.forEach((line: string) => {
  const [a, b] = line.split(/\s+/)
  listOne.push(+a)
  listTwo.push(+b)
})

// day one part one
listOne.sort()
listTwo.sort()

const distances = listOne.map((itemOne, idx) =>
  Math.abs(itemOne - listTwo[idx])
)

const sum = distances.reduce((prev, curr) => prev + curr, 0)
console.log(sum)

// day one part two
const listTwoCounts: Record<number, number> = {}
for (const item of listTwo) {
  if (item in listTwoCounts) {
    listTwoCounts[item] += 1
  } else {
    listTwoCounts[item] = 1
  }
}
console.log(
  listOne.map((item) => item * (listTwoCounts[item] ?? 0)).reduce(
    (prev, curr) => prev + curr,
    0,
  ),
)
