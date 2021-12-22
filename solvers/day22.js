export default (part, input) => {
  input = input.toString().trim().split('\n').map(e => [e.startsWith('on'), [...e.matchAll(/(-?\d+)/g)].map(e => +e[0])])
  const reactor = {}

  if (part === 2) {
    input.forEach(([on, range]) => {
      for (const old of Object.keys(reactor)) {
        const inter = intersect(range, dec(old))
        if (inter !== undefined) reactor[enc(inter)] = (reactor[enc(inter)] ?? 0) - reactor[old]
      }
      if (on) reactor[enc(range)] = 1
    })

    return Object.entries(reactor).reduce((t, [k, v]) => t + (size(dec(k)) * v), 0)
  }

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

// Array comparison sucks
const enc = JSON.stringify
const dec = JSON.parse

const intersect = ([x0, x1, y0, y1, z0, z1], [x2, x3, y2, y3, z2, z3]) => {
  x0 = Math.max(x0, x2)
  y0 = Math.max(y0, y2)
  z0 = Math.max(z0, z2)
  x1 = Math.min(x1, x3)
  y1 = Math.min(y1, y3)
  z1 = Math.min(z1, z3)
  if (x0 <= x1 && y0 <= y1 && z0 <= z1) {
    return [x0, x1, y0, y1, z0, z1]
  }
}

const size = ([x0, x1, y0, y1, z0, z1]) => (x1 - x0 + 1) * (y1 - y0 + 1) * (z1 - z0 + 1)
