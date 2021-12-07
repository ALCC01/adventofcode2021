export default (part, input) => {
  const p2 = part === 2
  input = input.toString().split(',').map(Number).filter(e => !isNaN(e)).sort((a, b) => a - b)

  let target = 0
  // Use the median for part 1
  // This assumes that input.length is even
  if (!p2) target = input[(input.length) / 2]
  // Use the average for part 2
  else target = Math.floor(input.reduce((t, e) => t + e, 0) / input.length)

  return input.map(e => !p2
    ? Math.abs(e - target)
    // Sum of consecutive numbers n(n+1)/2
    : Math.abs(e - target) * (Math.abs(e - target) + 1) / 2
  ).reduce((t, e) => t + e, 0)
}
