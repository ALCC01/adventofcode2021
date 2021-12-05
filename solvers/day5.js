export default (part, input) => {
  const lines = input.toString().split('\n').filter(e => !!e).map(e => e.split(' -> ').map(e => e.split(',').map(Number)))

  const votes = {}
  lines.map(points).flat().forEach(p => votes[p] ? votes[p]++ : votes[p] = 1)
  return Object.entries(votes).filter(([_, v]) => v > 1).length
}

const points = ([[x1, y1], [x2, y2]]) => {
  if (x1 === x2) return new Array(Math.abs(y1 - y2) + 1).fill('' + x1).map((e, i) => `${e},${Math.min(y1, y2) + i}`)
  if (y1 === y2) return new Array(Math.abs(x1 - x2) + 1).fill('' + y1).map((e, i) => `${Math.min(x1, x2) + i},${e}`)
  else return []
}
