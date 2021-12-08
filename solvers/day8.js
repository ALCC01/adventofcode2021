export default (part, input) => {
  const displays = input.toString().split('\n').filter(e => e).map(e => [e.slice(0, 58).split(' ').map(sort), e.slice(61).split(' ').map(sort)])

  if (part === 1) return displays.reduce((t, e) => t + e[1].filter(e => [2, 3, 4, 7].indexOf(e.length) !== -1).length, 0)
  else {
    return displays.map(([p, o]) => {
      // Add known numbers to the map
      const m = {
        1: rm(p, e => e.length === 2),
        7: rm(p, e => e.length === 3),
        4: rm(p, e => e.length === 4),
        8: rm(p, e => e.length === 7)
      }

      // Use the number of segments not in shared by digits to determine their value
      m[6] = rm(p, e => e.length === 6 && sub(e, m[7]).length === 4)
      m[5] = rm(p, e => e.length === 5 && sub(m[6], e).length === 1)
      m[2] = rm(p, e => e.length === 5 && sub(e, m[7]).length === 3)
      m[3] = rm(p, e => e.length === 5 && sub(e, m[2]).length === 1)
      m[9] = rm(p, e => e.length === 6 && sub(e, m[3]).length === 1)
      m[0] = p[0]

      // Invert the map
      const i = Object.entries(m).reduce((t, [k, v]) => {
        t[v] = k
        return t
      }, {})

      return parseInt(o.map(e => i[e]).join(''))
    }).reduce((t, e) => t + e, 0)
  }
}

const rm = (p, find) => p.splice(p.findIndex(find), 1)[0]
const sort = e => e.split('').sort().join('')
const sub = (a, b) => a.split('').filter(e => b.indexOf(e) === -1).join('')
