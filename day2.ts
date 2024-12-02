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

// part two
let safe2 = 0
parsedInput.forEach((report: string) => {
  const levels = report.split(/\s+/).map((i) => +i)

  let inc = true, dec = true, delta = true
  for (let i = 0; i < levels.length - 1; i++) {
    if (levels[i] >= levels[i + 1]) {
      inc = false
    }
    if (levels[i] <= levels[i + 1]) {
      dec = false
    }
    const diff = Math.abs(levels[i] - levels[i + 1])
    if (diff > 3 || diff < 1) {
      delta = false
    }
  }

  // try with dampener
  if (!((inc || dec) && delta)) {
    // skip each item once and try to be safe
    for (let skipIdx = 0; skipIdx < levels.length; skipIdx++) {
      const levelsCopy = JSON.parse(JSON.stringify(levels))
      levelsCopy.splice(skipIdx, 1)
      let skipInc = true, skipDec = true, skipDelta = true
      for (let i = 0; i < levelsCopy.length - 1; i++) {
        if (levelsCopy[i] >= levelsCopy[i + 1]) {
          skipInc = false
        }
        if (levelsCopy[i] <= levelsCopy[i + 1]) {
          skipDec = false
        }
        const diff = Math.abs(levelsCopy[i] - levelsCopy[i + 1])
        if (diff > 3 || diff < 1) {
          skipDelta = false
        }
      }

      // we have a match
      if ((skipInc || skipDec) && skipDelta) {
        inc = skipInc
        dec = skipDec
        delta = skipDelta
        break
      }
    }
  }

  if ((inc || dec) && delta) {
    safe2++
  }
})
console.log(safe2)
