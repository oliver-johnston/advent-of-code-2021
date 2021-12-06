import * as utils from '../utils'
import * as _ from 'lodash'

function solve(vectors: number[], days: number): number {
    let map = _.countBy(vectors, (x) => x)

    for (let day = 0; day < days; day++) {
        let births = map[0] ?? 0
        for (let i = 0; i < 8; i++) {
            map[i] = map[i + 1] ?? 0
        }
        map[6] += births
        map[8] = births
    }

    return _.chain(map).values().sum().value()
}

let example = utils
    .getExampleLines(6, 1)[0]
    .split(',')
    .map((x) => parseInt(x))

let data = utils
    .getDataLines(6)[0]
    .split(',')
    .map((x) => parseInt(x))

console.log(`Part 1 Example: ${solve(example, 80)}`)
console.log(`Part 1 Answer: ${solve(data, 80)}`)

console.log(`Part 2 Example: ${solve(example, 256)}`)
console.log(`Part 2 Answer: ${solve(data, 256)}`)
