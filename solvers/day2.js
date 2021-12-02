export default (part, input) => {
  input = input.toString().split('\n').map(e => {
    const [a, b] = e.split(' ')
    return [a, parseInt(b)]
  })
  console.log(input[input.length-1])

  const [x, y] = input.reduce((t, e) => {
    if (isNaN(e[1])) return t
    switch (e[0]) {
      case 'forward': return [t[0] + e[1], t[1]]
      case 'down': return [t[0], t[1] + e[1]]
      case 'up': return [t[0], t[1]-e[1]]
    }
  }, [0, 0])

  return x * y
}
