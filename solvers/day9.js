export default (part, input) => {
  input = input.toString().split('\n').filter(e => e).map(e => e.split('').map(Number))

  // Find the coordinates for lowpoints and map them to their value for part 1
  const low = input.map((e, y) => e.map((_, x) => [x, y])).flat().filter(xy => isLow(input, xy))
  if (part === 1) return low.map((e) => get(input, e)).reduce((t, e) => t + e, 0) + low.length

  // Here we search for each point higher neighbors starting from the lowpoint
  const basins = low
    .map(xy => {
      let [candidates, basin] = [[xy], []]

      // Continue searching for higher points until we have no candidate points
      while (candidates.length > 0) {
        basin.push(...candidates)
        candidates = uniq(candidates.map(e => expandLow(input, e)).flat(1))
      }

      return uniq(basin)
    })

  return basins.sort((a, b) => b.length - a.length).slice(0, 3).reduce((t, e) => t * e.length, 1)
}

// Returns a point's 4 neighbors' coordinates
const neighbors = ([x, y]) => [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]

// Returns a point's value or 9 if out of bounds
const get = (a, [x, y]) => x >= 0 && x < a[0].length && y >= 0 && y < a.length ? a[y][x] : +9

// Checks if a point is a lowpoint
const isLow = (a, xy) => {
  const r = get(a, xy)
  return neighbors(xy).every(e => get(a, e) > r)
}

// Returns neighbors that are higher than xy but lower than 9
const expandLow = (a, xy) => {
  const [r, c] = [get(a, xy), neighbors(xy)]
  return c.filter(xy => get(a, xy) > r && get(a, xy) !== 9)
}

// Utility function that removes duplicates from arrays (JS array comparison sucks)
const uniq = a => Array.from(new Set(a.map(JSON.stringify)), JSON.parse)
