import * as utils from '../utils'
import * as _ from 'lodash'

function solve(data: number[], windowSize: number): number {
    const windowedValues = _.range(0, data.length - windowSize)
        .map((idx) => _.slice(data, idx, idx + windowSize))
        .map((x) => _.sum(x))
    return windowedValues.filter((val, idx) => idx > 0 && val > windowedValues[idx - 1]).length
}

let exampleLines = utils.getExampleLines(1, 1).map((x) => parseInt(x))
let dataLines = utils.getDataLines(1).map((x) => parseInt(x))

console.log(`Part 1 Example: ${solve(exampleLines, 1)}`)
console.log(`Part 1 Answer: ${solve(dataLines, 1)}`)

console.log(`Part 2 Example: ${solve(exampleLines, 3)}`)
console.log(`Part 2 Answer: ${solve(dataLines, 3)}`)
