import * as utils from '../utils'
import * as _ from 'lodash'

function solve(positions: number[], fuel: any): number {
    const min = _.min(positions) ?? 0
    const max = _.max(positions) ?? 0
    const allPositions = _.range(min, max + 1)
    const allCosts = allPositions.map((i) => _.sum(positions.map((p) => fuel(p, i))))
    return _.min(allCosts) ?? 0
}

let example = utils
    .getExampleLines(7, 1)[0]
    .split(',')
    .map((x) => parseInt(x))

let data = utils
    .getDataLines(7)[0]
    .split(',')
    .map((x) => parseInt(x))

const fuel1 = (x: number, y: number) => Math.abs(x - y)

console.log(`Part 1 Example: ${solve(example, fuel1)}`)
console.log(`Part 1 Answer: ${solve(data, fuel1)}`)

const fuel2 = (x: number, y: number) => {
    const distance = Math.abs(x - y)
    return _.sum(_.range(1, distance + 1))
}

console.log(`Part 2 Example: ${solve(example, fuel2)}`)
console.log(`Part 2 Answer: ${solve(data, fuel2)}`)
