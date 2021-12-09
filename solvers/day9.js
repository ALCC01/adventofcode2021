export default (part, input) => {
  input = input.toString().split('\n').filter(e => e).map(e => e.split('').map(Number))

  const lowpoints = input.map((e, y, g) => e.filter((e, x, r) =>
    (y !== 0 ? g[y - 1][x] > e : true) &&
      (y !== g.length - 1 ? g[y + 1][x] > e : true) &&
      (x !== 0 ? r[x - 1] > e : true) &&
      (x !== r.length - 1 ? r[x + 1] > e : true)
  )).flat()

  return lowpoints.reduce((t, e) => t + e, 0) + lowpoints.length
}
