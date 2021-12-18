export default (part, input) => {
  input = input.toString().match(/-?[0-9]+/g).map(Number)

  if (part === 1) {
    // The highest the initial velocity, the highest the point that the probe will reach
    // The maximum initial velocity is the one that allows us to reach minY with Vy = 0
    const maxVy = (-input[2]) - 1

    // This is just the sum of all the velocities between 1 and maxVy
    return (maxVy + 1) * maxVy / 2
  }

  let count = 0
  // The Vy constraints have some justification, but those on Vx are guesstimations
  for (let Vx = input[0] - 500; Vx < input[1] + 500; Vx++) {
    for (let Vy = input[2]; Vy < Math.abs(input[2]); Vy++) {
      count += fly([Vx, Vy], input)
    }
  }

  return count
}

function fly ([Vx, Vy], [minX, maxX, minY, maxY]) {
  let [x, y] = [0, 0]

  while (x < maxX && y > minY) {
    [x, y] = [x + Vx, y + Vy];
    [Vx, Vy] = [Vx - Math.sign(Vx), Vy - 1]

    if (x >= minX && x <= maxX && y >= minY && y <= maxY) return 1
  }

  return 0
}
