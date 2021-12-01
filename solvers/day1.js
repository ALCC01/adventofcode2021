export default (part, input) => {
  input = input.toString().split('\n').map(Number)

  if (part === 2) {
    input = input.map((e, i, a) => {
      if (i > a.length - 3) return undefined
      else return e + a[i + 1] + a[i + 2]
    })
  }
  const count = input.reduce((t, e, i, a) => {
    if (i === 0 || e === undefined) return t
    else if (e > a[i - 1]) return t + 1
    else return t
  }, 0)

  return count
}
