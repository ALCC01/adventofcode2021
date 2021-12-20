let fill = '0'

export default (part, input) => {
  input = input.toString().trim()
  const algorithm = input.slice(0, 512).replaceAll('#', '1').replaceAll('.', '0')
  let grid = input.slice(514).split('\n').map(e => e.split('').map(e => e === '#' ? '1' : '0'))

  for (let i = 0; i < (part === 2 ? 50 : 2); i++) {
    // Expand the grid by 1 on each side
    const length = grid.length + 2
    grid = Array.from({ length }, (_, y) => Array.from({ length }, (_, x) => algorithm[enhance(grid, [x - 1, y - 1])]))

    // If the first bit of the algorithm is 1 then the background flips each round resulting in infinite lighted pixels
    fill = algorithm[0] === '1' && fill === '0' ? '1' : '0'
  }

  return grid.flat().map(Number).reduce((t, e) => t + e, 0)
}

const get = (grid, [x, y]) => grid[y] && grid[y][x] ? grid[y][x] : fill

const neighbors = ([x, y]) => [[x - 1, y - 1], [x, y - 1], [x + 1, y - 1], [x - 1, y], [x, y], [x + 1, y], [x - 1, y + 1], [x, y + 1], [x + 1, y + 1]]

const enhance = (grid, coords) => parseInt(neighbors(coords).reduce((t, e) => t + get(grid, e), ''), 2)
