export default (part, input) => {
  input = input.toString().split('\n')
    .map(e => e.split('').map(e => parseInt(e)))

  const values = input.reduce((t, e, i, a) => {
    e.forEach((b, i) => {
      t[i] += b - 0.5
    })
    return t
  }, new Array(input[0].length).fill(0))

  // If a position is > 0 then 1 is the most common value
  const gamma = parseInt(values.map(e => e > 0 ? 1 : 0).join(''), 2)
  // If a position is > 0 then 0 is the least common value
  const epsilon = parseInt(values.map(e => e > 0 ? 0 : 1).join(''), 2)

  return gamma * epsilon
}
