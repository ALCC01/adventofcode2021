export default (part, input) => {
  let [p1, p2] = input.toString().trim().split('\n').map(e => +e.slice(28))
  let [score1, score2] = [0, 0]

  if (part === 2) return Math.max(...wins(p1, p2, 0, 0, true))

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

// Maps each possible roll result to the number of its occurences
// Eg 4 can be the result of 3 different permutations of 3 dice rolls
const rollCounts = [
  [3, 1],
  [4, 3],
  [5, 6],
  [6, 7],
  [7, 6],
  [8, 3],
  [9, 1]
]

// Memory is to memorization as memoy is to memoization ;)
// Caches the number of wins for a given set of conditions
const memoy = []

const wins = (p1, p2, score1, score2, isP1) => {
  const key = [score1, p1, score2, p2, isP1]
  let res = [0, 0]

  if (memoy[key]) return memoy[key]
  else if (score1 >= 21) res = [1, 0]
  else if (score2 >= 21) res = [0, 1]
  else {
    for (const [roll, n] of rollCounts) {
      if (isP1) {
        const pos = (p1 + roll - 1) % 10 + 1
        res = sum(res, mul(wins(pos, p2, score1 + pos, score2, false), n))
      } else {
        const pos = (p2 + roll - 1) % 10 + 1
        res = sum(res, mul(wins(p1, pos, score1, score2 + pos, true), n))
      }
    }
  }

  return memoy[key] = res // eslint-disable-line no-return-assign
}

// Sums two pairs of values
const sum = ([a, c], [b, d]) => [a + b, c + d]
// Multiplies a pair of values by another value
const mul = ([a, b], c) => [a * c, b * c]
