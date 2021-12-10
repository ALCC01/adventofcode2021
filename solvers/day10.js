export default (part, input) => {
  input = input.toString().split('\n').filter(e => e).map(e => e.split(''))

  const scores = input.map(line => {
    const stack = []
    for (const c of line) {
      if (closingChars.indexOf(c) === -1) stack.push(c)
      else if (!compare(stack.pop(), c)) return values[c]
    }

    return 0
  })

  return scores.reduce((t, e) => t + e, 0)
}

const values = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
}

const closingChars = Object.keys(values)

const compare = (a, b) => {
  return (a === '(' && b === ')') ||
    (a === '[' && b === ']') ||
    (a === '{' && b === '}') ||
    (a === '<' && b === '>')
}
