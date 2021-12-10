import * as utils from '../utils'
import * as _ from 'lodash'

const pairs = new Map<string, string>([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
    ['<', '>'],
])

const scores = new Map<string, number>([
    ['', 0],
    [')', 3],
    [']', 57],
    ['}', 1197],
    ['>', 25137],
])

const closingScores = new Map<string, number>([
    [')', 1],
    [']', 2],
    ['}', 3],
    ['>', 4],
])

function getFirstIllegalChar(line: string[]): string {
    const stack: string[] = []
    for (let x of line) {
        if (pairs.has(x)) {
            stack.push(x)
        } else {
            var match = stack.pop()
            if (match === undefined) {
                return ''
            }
            if (x !== pairs.get(match)) {
                return x
            }
        }
    }
    return ''
}

function getClosingChars(line: string[]): string[] {
    const stack: string[] = []
    for (let x of line) {
        if (pairs.has(x)) {
            stack.push(x)
        } else {
            stack.pop()
        }
    }

    const closingChars: string[] = []
    while (stack.length > 0) {
        closingChars.push(pairs.get(stack.pop() ?? '') ?? '')
    }

    return closingChars
}

function solve(lines: string[][]): number {
    return _.chain(lines)
        .map((l) => getFirstIllegalChar(l))
        .map((c) => scores.get(c))
        .sum()
        .value()
}

function solve2(lines: string[][]): number {
    var scores = _.chain(lines)
        .filter((l) => getFirstIllegalChar(l) === '')
        .map((l) => getClosingChars(l).map((c) => closingScores.get(c) ?? 0))
        .map((l) => l.reduce((a, b) => a * 5 + b))
        .orderBy((x) => x)
        .value()

    return scores[(scores.length - 1) / 2]
}

let example = utils.getExampleLines(10, 1).map((x) => x.split(''))
let data = utils.getDataLines(10).map((x) => x.split(''))

console.log(`Part 1 Example: ${solve(example)}`)
console.log(`Part 1 Answer: ${solve(data)}`)

console.log(`Part 2 Example: ${solve2(example)}`)
console.log(`Part 2 Answer: ${solve2(data)}`)
