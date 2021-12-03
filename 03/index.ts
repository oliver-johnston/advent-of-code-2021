import * as utils from '../utils'
import * as _ from 'lodash'

function get_number(lines: string[], sort: 'asc' | 'desc', filter: boolean) {
    let len = lines[0].length

    let result = ''
    for (let i = 0; i < len; i++) {
        let bits = lines.map((l) => l[i])
        let bit = _.chain(bits)
            .groupBy((x) => x)
            .orderBy((x) => x.length + x[0], sort)
            .value()[0][0]

        result += bit
        if (filter) lines = lines.filter((l) => l[i] === bit)
    }

    return parseInt(result, 2)
}

function solve(lines: string[]): number {
    let gamma = get_number(lines, 'desc', false)
    let delta = get_number(lines, 'asc', false)
    return gamma * delta
}

function solve2(lines: string[]): number {
    let o2 = get_number(lines, 'desc', true)
    let co2 = get_number(lines, 'asc', true)
    return o2 * co2
}

let exampleLines = utils.getExampleLines(3, 1)
let dataLines = utils.getDataLines(3)

console.log(`Part 1 Example: ${solve(exampleLines)}`)
console.log(`Part 1 Answer: ${solve(dataLines)}`)

console.log(`Part 2 Example: ${solve2(exampleLines)}`)
console.log(`Part 2 Answer: ${solve2(dataLines)}`)
