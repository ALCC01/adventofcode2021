export default (part, input) => {
  const displays = input.toString().split('\n').map(e => [e.slice(0, 58).split(' '), e.slice(61).split(' ')])
  return displays.reduce((t, e) => t + e[1].filter(e => [2, 3, 4, 7].indexOf(e.length) !== -1).length, 0)
}
