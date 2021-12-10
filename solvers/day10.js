export default (part, input) => {
  input = input.toString().split('\n').filter(e => e).map(e => e.split(''))

  let scores = input.map(line => {
    const stack = []
    // Return a positive score for corrupt lines
    for (const c of line) {
      if (closingChars.indexOf(c) === -1) stack.push(c)
      else if (c !== equiv[stack.pop()]) return values[c][0]
    }

    // Return a negative score for incomplete lines
    if (part === 2 && stack.length !== 0) return stack.reverse().reduce((t, c) => t * 5 - values[equiv[c]][1], 0)

    return 0
  })

  if (part === 1) return scores.filter(e => e >= 0).reduce((t, e) => t + e, 0)

  // Invert negative scores for incomplete lines
  scores = scores.filter(e => e <= 0).sort((a, b) => a - b)
  return -scores[(scores.length - 1) / 2]
}

const values = {
  ')': [3, 1],
  ']': [57, 2],
  '}': [1197, 3],
  '>': [25137, 4]
}

const closingChars = Object.keys(values)

const equiv = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>'
}
