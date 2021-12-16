export default (part, input) => {
  input = hex2bin(input)
  if (part === 1) return reduce(packet(input)[0])
  else return evaluate(packet(input)[0])
}

const reduce = ({ type, version, payload }) => {
  if (type === 4) return version
  else return version + payload.map(reduce).reduce((t, e) => t + e, 0)
}

const evaluate = ({ type, payload }) => {
  if (type === 0) return payload.map(evaluate).reduce((t, e) => t + e)
  if (type === 1) return payload.map(evaluate).reduce((t, e) => t * e)
  if (type === 2) return Math.min(...payload.map(evaluate))
  if (type === 3) return Math.max(...payload.map(evaluate))
  if (type === 4) return payload
  if (type === 5) return evaluate(payload[0]) > evaluate(payload[1]) ? 1 : 0
  if (type === 6) return evaluate(payload[0]) < evaluate(payload[1]) ? 1 : 0
  if (type === 7) return evaluate(payload[0]) === evaluate(payload[1]) ? 1 : 0
}

const packet = (str) => {
  let version, type
  [version, str] = consume(str, 0, 3, true);
  [type, str] = consume(str, 0, 3, true)

  if (type === 4) {
    let [group, payload] = ['test', 0]
    while (group[0] !== '0') {
      [group, str] = consume(str, 0, 5)
      payload = payload * 16 + bin(group.slice(1))
    }

    return [{ type, version, payload }, str]
  } else {
    let lenType
    [lenType, str] = consume(str, 0, 1, true)

    if (lenType === 0) {
      let length, sub, p
      [length, str] = consume(str, 0, 15, true);
      [sub, str] = consume(str, 0, length)

      const packets = []
      while (sub.length > 0) {
        [p, sub] = packet(sub)
        packets.push(p)
      }

      return [{ type, version, payload: packets }, str]
    } else {
      let n, p
      [n, str] = consume(str, 0, 11, true)
      const packets = []
      while (packets.length < n) {
        [p, str] = packet(str)
        packets.push(p)
      }

      return [{ type, version, payload: packets }, str]
    }
  }
}

const consume = (str, start, end, parse = false) => [parse ? bin(str.slice(start, end)) : str.slice(start, end), str.slice(end)]

const bin = (binary) => parseInt(binary, 2)

const hex2bin = (hex) => hex.trim().split('').map(e => parseInt(e, 16).toString(2).padStart(4, '0')).join('')
