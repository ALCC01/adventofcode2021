export default (part, input) => {
  input = input.toString().trim().split('\n').map(e => [e.startsWith('on'), [...e.matchAll(/(-?\d+)/g)].map(e => +e[0])])

  const reactor = {}

  input.forEach(([on, range]) => {
    for (const i of cubes(range)) reactor[i] = on
  })
  
  return Object.values(reactor).filter(e => e).length
}

function * cubes ([x0, x1, y0, y1, z0, z1]) {
  x0 = Math.max(-50, x0)
  x1 = Math.min(50, x1)
  y0 = Math.max(-50, y0)
  y1 = Math.min(50, y1)
  z0 = Math.max(-50, z0)
  z1 = Math.min(50, z1)
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      for (let z = z0; z <= z1; z++) {
        yield x * 10000 + y * 100 + z
      }
    }
  }
}
