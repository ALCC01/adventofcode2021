export default (part, input) => {
  input = input.toString().split('\n')
    .map(e => e.split('').map(e => parseInt(e)))

  if (part === 1) {
    const values = common(input)
    // If a position is > 0 then 1 is the most common value
    const gamma = arrayToNumber(values.map(e => e > 0 ? 1 : 0))
    // If a position is > 0 then 0 is the least common value
    const epsilon = arrayToNumber(values.map(e => e > 0 ? 0 : 1))

    return gamma * epsilon
  } else {
    let [o2, co2, o2i, co2i] = [input, input, 0, 0]

    // Apply criteria until we have a single number
    while (o2.length > 1) {
      o2 = criteria(true, o2, o2i)
      o2i++
    }

    while (co2.length > 1) {
      co2 = criteria(false, co2, co2i)
      co2i++
    }

    return arrayToNumber(co2[0]) * arrayToNumber(o2[0])
  }
}

const arrayToNumber = (array) => parseInt(array.join(''), 2)

function criteria (o2, input, i) {
  const values = common(input)
  return input.filter(e => e[i] === (o2 ? +(values[i] >= 0) : +(values[i] < 0)))
}

function common (input) {
  return input.reduce((t, e, i, a) => {
    e.forEach((b, i) => {
      t[i] += b - 0.5
    })
    return t
  }, new Array(input[0].length).fill(0))
}
