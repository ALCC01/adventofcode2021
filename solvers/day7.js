export default (part, input) => {
  input = input.toString().split(',').map(Number).filter(e => !isNaN(e)).sort((a, b) => a - b)

  // This assumes that input.length is even
  const target = input[(input.length) / 2]

  return input.map(e => Math.abs(e - target)).reduce((t, e) => t + e, 0)
}
