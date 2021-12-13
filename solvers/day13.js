export default (part, input) => {
  const [points, folds] = input.toString().split('\n').filter(e => e).reduce(([points, folds], e) => {
    if (/[0-9]+,[0-9+]/.test(e)) points.push(e.split(',').map(Number))
    else folds.push([e.slice(11, 12), e.slice(13)])
    return [points, folds]
  }, [[], []])

  if (part === 1) return new Set(fold(points, folds[0]).map(String)).size

  return printGrid(folds.reduce((p, f) => fold(p, f), points))
}

const fold = (points, [ax, i]) => points.map(([x, y]) => [
  ax === 'x' ? i - Math.abs(x - i) : x,
  ax === 'y' ? i - Math.abs(y - i) : y
])

const printGrid = (points) => {
  const mX = points.sort((a, b) => b[0] - a[0])[0][0]
  const mY = points.sort((a, b) => b[1] - a[1])[0][1]
  let r = ''

  points = new Set(points.map(String))
  for (let y = 0; y <= mY; y++) {
    for (let x = 0; x <= mX; x++) r += points.has(`${x},${y}`) ? '█' : ' '
    r += '\n'
  }

  return r
}
