const input = await Deno.readTextFile('./input2')
const parsedInput = input.split('\n')
parsedInput.pop()

// part one
let safe = 0
parsedInput.forEach((report: string) => {
  const levels = report.split(/\s+/).map((i) => +i)
  if (
    ((
      // all increasing
      levels.every((level, idx) => {
        if (idx === levels.length - 1) return true
        return level < levels[idx + 1]
      })
    ) || (
      // all decreasing
      levels.every((level, idx) => {
        if (idx === levels.length - 1) return true
        return level > levels[idx + 1]
      })
    )) && (
      // 1 <= delta <= 3
      levels.every((level, idx) => {
        if (idx === levels.length - 1) return true
        const diff = Math.abs(level - levels[idx + 1])
        return (1 <= diff) && (diff <= 3)
      })
    )
  ) {
    safe++
  }
})
console.log(safe)
