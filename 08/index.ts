import * as utils from '../utils'
import * as _ from 'lodash'

interface Line {
    inputs: string[]
    outputs: string[]
}

function parse(line: string): Line {
    const split = line.split(' | ')
    return {
        inputs: split[0].split(' ').map((x) => _.sortBy(x).join('')),
        outputs: split[1].split(' ').map((x) => _.sortBy(x).join('')),
    }
}

function solve(lines: Line[]): number {
    return _.chain(lines)
        .flatMap((x) => x.outputs)
        .filter((x) => [2, 3, 4, 7].includes(x.length))
        .value().length
}

function read(line: Line): number {
    const lengthGroups = _.groupBy(
        line.inputs.map((x) => x.split('')),
        (x) => x.length
    )

    const codes: string[][] = []

    codes[1] = single(lengthGroups[2])
    codes[4] = single(lengthGroups[4])
    codes[7] = single(lengthGroups[3])
    codes[8] = single(lengthGroups[7])

    const fivesIntersection = _.intersection(...lengthGroups[5]) // gives a, d, g
    const sixesIntersection = _.intersection(...lengthGroups[6]) // gives a, b, f, g

    const d = single(_.difference(fivesIntersection, sixesIntersection))

    codes[0] = single(lengthGroups[6].filter((x) => !x.includes(d)))
    codes[9] = single(lengthGroups[6].filter((x) => x !== codes[0] && _.difference(x, codes[1]).length === 4))
    codes[6] = single(_.difference(lengthGroups[6], [codes[0], codes[9]]))

    codes[3] = single(lengthGroups[5].filter((x) => _.difference(x, codes[1]).length === 3))
    codes[5] = single(lengthGroups[5].filter((x) => x !== codes[3] && _.difference(x, codes[9]).length === 0))
    codes[2] = single(_.difference(lengthGroups[5], [codes[3], codes[5]]))

    const joinedCodes = codes.map((x) => x.join(''))
    let result = 0
    for (const o of line.outputs) {
        result = result * 10 + joinedCodes.indexOf(o)
    }

    return result
}

function single<T>(array: T[]): T {
    if (array.length !== 1) {
        throw 'not exactly one element'
    }
    return array[0]
}

function solve2(lines: Line[]): number {
    return _.sum(lines.map((x) => read(x)))
}

let example = utils.getExampleLines(8, 1).map((l) => parse(l))
let data = utils.getDataLines(8).map((l) => parse(l))

console.log(`Part 1 Example: ${solve(example)}`)
console.log(`Part 1 Answer: ${solve(data)}`)

console.log(`Part 2 Example: ${solve2(example)}`)
console.log(`Part 2 Answer: ${solve2(data)}`)
