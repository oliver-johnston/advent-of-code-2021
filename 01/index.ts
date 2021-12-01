import * as utils from '../utils'
import * as _ from 'lodash'

function window(data: number[], windowSize: number) : number[][] {
    let result = []
    for(let i = 0; i <= data.length - windowSize; i++)
    {
        result.push(_.slice(data, i, i + windowSize))
    }
    return result
}

function solve(data: number[], windowSize: number) : number {
    let values = window(data, windowSize).map(x => _.sum(x))
    return values.filter((val, idx) => idx > 0 && val > values[idx-1]).length
}


console.log(`Part 1 Example: ${solve(utils.getExampleLines(1, 1).map(x => parseInt(x)), 1)}`)
console.log(`Part 1 Answer: ${solve(utils.getDataLines(1).map(x => parseInt(x)), 1)}`)

console.log(`Part 2 Example: ${solve(utils.getExampleLines(1, 1).map(x => parseInt(x)), 3)}`)
console.log(`Part 2 Answer: ${solve(utils.getDataLines(1).map(x => parseInt(x)), 3)}`)
