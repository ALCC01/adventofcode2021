export default (part, input) => {
  const p2 = part === 2
  input = input.toString().split('\n').map(e => {
    const [a, b] = e.split(' ')
    return [a, parseInt(b)]
  })

  const [x, y] = input.reduce((t, e) => {
    if (isNaN(e[1])) return t
    switch (e[0]) {
      // Increase x, increase y if part 2
      case 'forward': return [t[0] + e[1], t[1] + (+p2 * t[2] * e[1]), t[2]]
      // Increase y if part 1, increase aim
      case 'down': return [t[0], t[1] + (+!p2 * e[1]), t[2] + e[1]]
      // Decrease y if part 1, decrease aim
      case 'up': return [t[0], t[1] - (+!p2 * e[1]), t[2] - e[1]]
      default: return t
    }
  }, [0, 0, 0])

  return x * y
}
