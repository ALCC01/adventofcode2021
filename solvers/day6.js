export default (part, input) => {
  const days = part === 2 ? 256 : 80
  const ages = input.toString().split(',').map(Number).reduce((t, e) => {
    t[e]++
    return t
  }, new Array(9).fill(0))

  for (let day = 0; day < days; day++) {
    ages.push(ages.shift())
    ages[6] += ages[8]
  }

  return ages.reduce((t, e) => t + e, 0)
}
