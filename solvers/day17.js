export default (part, input) => {
  input = input.toString().match(/-?[0-9]+/g).map(Number)

  // The highest the initial velocity, the highest the point that the probe will reach
  // The maximum initial velocity is the one that allows us to reach minY with Vy = 0
  const maxVy = (-input[2]) - 1

  // This is just the sum of all the velocities between 1 and maxVy
  return (maxVy + 1) * maxVy / 2
}
