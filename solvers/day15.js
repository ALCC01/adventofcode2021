export default (part, input) => {
  let grid = input.toString().split('\n').filter(e => e).map(e => e.split('').map(Number))
  let LEN = grid.length

  if (part === 2) {
    LEN *= 5
    grid = Array.from({ length: LEN }, (_, y) =>
      Array.from({ length: LEN }, (_, x) =>
        ((grid[y % grid.length][x % grid[0].length] + Math.floor(y / grid.length) + Math.floor(x / grid[0].length) - 1) % 9) + 1
      )
    )
  }

  const costs = grid.map(r => r.map(e => Infinity))
  costs[0][0] = 0

  // Who needs pathfinding?
  // Arbitrary value that lets the grid stabilize
  for (let i = 0; i < 5; i++) {
    for (let y = 0; y < LEN; y++) {
      for (let x = 0; x < LEN; x++) {
        costs[y][x] = x + y === 0
          ? 0
          : grid[y][x] + Math.min(
            costs[y - 1]?.[x] ?? Infinity,
            costs[y]?.[x - 1] ?? Infinity,
            costs[y + 1]?.[x] ?? Infinity,
            costs[y]?.[x + 1] ?? Infinity
          )
      }
    }
  }

  return costs[LEN - 1][LEN - 1]
}
