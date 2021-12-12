const edges = { end: [] }

export default (part, input) => {
  input.toString().split('\n').filter(e => e).map(e => e.split('-'))
    .forEach(([from, to]) => {
      edges[from] = edges[from] ? [...edges[from], to] : [to]
      edges[to] = edges[to] ? [...edges[to], from] : [from]
    })

  return paths('start', new Set(), part === 2)
}

const paths = (from, visited, part2 = false, twice = false) => {
  if (from === 'end') return 1
  if (from === 'start' && visited.size) return 0
  if (visited.has(from) && from === from.toLowerCase()) {
    if (!part2 || (part2 && twice)) return 0
    if (part2) twice = true
  }

  return edges[from].reduce((n, to) => n + paths(to, new Set([...visited, from]), part2, twice), 0)
}
