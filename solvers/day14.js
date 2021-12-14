export default (part, input) => {
  let [polymer, ...rules] = input.toString().split('\n').filter(e => e)
  rules = Object.fromEntries(rules.map(e => e.split(' -> ')))

  let pairs = {}
  for (let i = 0; i < polymer.length - 1; i++) {
    const pair = polymer.slice(i, i + 2)
    pairs[pair] = (pairs[pair] ?? 0) + 1
  }

  for (let step = 0; step < (part === 2 ? 40 : 10); step++) {
    pairs = Object
      .entries(pairs)
      .map(([pair, n]) => [[pair[0] + rules[pair], n], [rules[pair] + pair[1], n]])
      .flat(1)
      .reduce((t, [k, v]) => ({ ...t, [k]: (t[k] ?? 0) + v }), {})
  }

  const elements = {}
  for (const [pair, n] of Object.entries(pairs)) {
    elements[pair[0]] = (elements[pair[0]] ?? 0) + n
    elements[pair[1]] = (elements[pair[1]] ?? 0) + n
  }

  const scores = Object.values(elements).map(e => Math.ceil(e / 2)).sort((a, b) => b - a)

  return scores[0] - scores[scores.length - 1]
}
