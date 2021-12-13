export default (part, input) => {
  const [points, folds] = input.toString().split('\n').filter(e => e).reduce(([points, folds], e) => {
    if (/[0-9]+,[0-9+]/.test(e)) points.push(e.split(',').map(Number))
    else folds.push([e.slice(11, 12), e.slice(13)])
    return [points, folds]
  }, [[], []])

  // JS array comparison sucks
  return new Set(fold(points, folds[0]).map(String)).size
}

const fold = (points, [ax, i]) => points.map(([x, y]) => [
  ax === 'x' ? i - Math.abs(x - i) : x,
  ax === 'y' ? i - Math.abs(y - i) : y
])
