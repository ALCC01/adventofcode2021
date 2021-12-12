const edges = { end: [] }

export default (part, input) => {
  input.toString().split('\n').filter(e => e).map(e => e.split('-'))
    .forEach(([from, to]) => {
      edges[from] = edges[from] ? [...edges[from], to] : [to]
      edges[to] = edges[to] ? [...edges[to], from] : [from]
    })

  return paths('start', new Set())
}

const paths = (from, visited) => {
  if (from === 'end') return 1
  if (visited.has(from) && from === from.toLowerCase()) return 0

  return edges[from].reduce((n, to) => n + paths(to, new Set([...visited, from])), 0)
}
