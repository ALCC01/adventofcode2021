export default (part, input) => {
  input = input.toString().split('\n').filter(e => e).map(e => e.split('').map(Number))
  let count = 0

  for (let n = 0; ; n++) {
    input = input.map(l => l.map(o => o + 1))

    while (input.flat().some(v => v > 9)) {
      eachCell(input, (e, [x, y]) => {
        if (e > 9) {
          input[y][x] = 0
          neighbors.forEach(([x0, y0]) => increase(input, [x + x0, y + y0]))
        }
      })
    }

    const flashes = input.flat().filter(v => v === 0).length
    if (part === 2 && flashes === 100) return n + 1

    count += flashes
    if (part === 1 && n === 99) return count
  }
}

const neighbors = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]

const increase = (input, [x, y]) => {
  if (x >= 0 && x < 10 && y >= 0 && y < 10 && input[y][x] > 0) input[y][x] += 1
}

const eachCell = (a, fn) => a.forEach((r, y) => r.forEach((e, x) => fn(e, [x, y])))
