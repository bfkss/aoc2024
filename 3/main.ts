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

const re2 =
  /(mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)|(?<y>do\(\))|(?<n>don't\(\)))/gm
const matches2 = input.matchAll(re2)
let sum2 = 0
let enabled = true
for (const match of matches2) {
  if (enabled && match.groups?.n) {
    enabled = false
  }
  if (!enabled && match.groups?.y) {
    enabled = true
  }
  if (enabled && match.groups?.a && match.groups?.b) {
    sum2 += +match.groups.a * +match.groups.b
  }
}
console.log(sum2)
