export default (part, input) => {
  input = input.toString().trim().split('\n').map(e => e.trim())

  if (part === 1) return magnitude(input.reduce(add))

  return input
    .flatMap(p1 => input.map(p2 => [p1, p2])) // Generates all possible combinations
    .map(p => magnitude(add(...p))) // Calculates their magnitudes
    .reduce((t, e) => Math.max(t, e), 0)
}

const magnitude = (e) => {
  if (typeof e === 'string') e = JSON.parse(e)
  if (Array.isArray(e)) return 3 * magnitude(e[0]) + 2 * magnitude(e[1])

  return e
}

const add = (a, b) => {
  let s = `[${a},${b}]`
  let old = s

  while (true) {
    old = s
    if ((s = explode(s)) !== old) continue
    if ((s = split(s)) !== old) continue
    break
  }

  return old
}

function explode (s) {
  let brackets = 0

  for (let i = 0; i < s.length; i++) {
    // If we've entered a > 4 depth pair
    if (brackets >= 5) {
      // Matches the pair's left and right number
      const [pair, nl, nr] = s.slice(i).match(/([0-9]+),([0-9]+)/)
      // Sums a regular number (and its punctuation) on the left to nl
      const left = s.slice(0, i - 1).replace(/([0-9]+)([^0-9]+)$/, (_, number, punctuation) => `${+number + +nl}${punctuation}`)
      // Sums a regular number on the right to nr
      const right = s.slice(i + pair.length + 1).replace(/([0-9]+)/, d => +d + +nr)

      return `${left}0${right}`
    }

    // Keeps track of how deep we've come
    brackets += s[i] === '[' ? +1 : 0
    brackets += s[i] === ']' ? -1 : 0
  }

  return s
}

// Splits numbers >=10 into a pair
const split = (s) => s.replace(/([0-9]{2,})/, e => `[${Math.floor(e / 2)},${Math.ceil(e / 2)}]`)
