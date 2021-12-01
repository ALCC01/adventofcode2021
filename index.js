#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import * as solvers from './solvers/index.js'

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <day> <part> [file]')
  .demandCommand(2)
  .positional('day', { describe: 'Day of the challenge to solve', type: 'number' })
  .positional('part', { describe: 'Part of the challenge to solve', type: 'number' })
  .positional('file', { describe: 'Input file path' })
  .strict()
  .parse()

let input

try {
  if (argv._.length < 3) {
    input = readFileSync(process.stdin.fd, 'utf-8')
  } else {
    input = readFileSync(resolve(argv._[2]), 'utf-8')
  }
} catch (e) {
  console.error(e.message)
  console.error('Could not read input')
  process.exit(-1)
}

const [day, part] = argv._

if (!Number.isInteger(day) || !Number.isInteger(part)) {
  console.error('<day> and <part> must be integers')
  process.exit(-1)
}

console.log(`Solving challenge ${day}.${part}`)
console.time('Solution time')
console.log(solvers[`day${day}`](part, input))
console.timeEnd('Solution time')

// console.log(input)
