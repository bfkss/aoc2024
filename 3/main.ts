const input = await Deno.readTextFile('./input')
const parsedInput = input.split('\n')
parsedInput.pop()

const re = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/gm
const matches = input.matchAll(re)
let sum = 0
for (const match of matches) {
  sum += +match.groups!.a * +match.groups!.b
}
console.log(sum)
