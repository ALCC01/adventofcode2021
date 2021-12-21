export default (part, input) => {
  let [p1, p2] = input.toString().trim().split('\n').map(e => +e.slice(28))
  let [score1, score2] = [0, 0]

  const die = dice()
  while (true) {
    let [roll, n] = die.next().value
    p1 = (p1 + roll) % 10
    score1 += p1 === 0 ? 10 : p1

    if (score1 >= 1000) return n * score2;

    [roll, n] = die.next().value
    p2 = (p2 + roll) % 10
    score2 += p2 === 0 ? 10 : p2

    if (score2 >= 1000) return n * score1
  }
}

function * dice () {
  let n = 0
  while (true) {
    yield [(n + 1) % 100 + (n + 2) % 100 + (n + 3) % 100, n + 3]
    n += 3
  }
}
