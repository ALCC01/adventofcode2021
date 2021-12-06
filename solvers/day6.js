export default (part, input) => {
  input = input.toString().split(',').map(Number)

  for (let day = 0; day < 80; day++) input = input.map(t => t ? t - 1 : [6, 8]).flat()

  return input.length
}
