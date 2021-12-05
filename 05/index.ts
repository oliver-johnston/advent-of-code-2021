import * as utils from '../utils'
import * as _ from 'lodash'

interface Vector {
    x1: number
    y1: number

    x2: number
    y2: number
}

function parse(lines: string[]): Vector[] {
    return lines.map((l) => {
        let spl = l.split(' -> ')
        let a = spl[0].split(',')
        let b = spl[1].split(',')
        return {
            x1: parseInt(a[0]),
            y1: parseInt(a[1]),
            x2: parseInt(b[0]),
            y2: parseInt(b[1]),
        }
    })
}

function countOverlaps(vectors: Vector[]): number {
    let maxX = _.chain(vectors)
        .map((v) => [v.x1, v.x2])
        .flatten()
        .max()
        .value()

    let maxY = _.chain(vectors)
        .map((v) => [v.y1, v.y2])
        .flatten()
        .max()
        .value()

    let grid = _.range(0, maxX + 1).map((x) => _.range(0, maxY + 1).map((y) => 0))

    for (let v of vectors) {
        let xUnit = Math.sign(v.x2 - v.x1)
        let yUnit = Math.sign(v.y2 - v.y1)

        let x = v.x1
        let y = v.y1

        while (x !== v.x2 || y !== v.y2) {
            grid[x][y]++
            x += xUnit
            y += yUnit
        }
        grid[x][y]++
    }

    return _.chain(grid)
        .flatten()
        .filter((x) => x > 1)
        .value().length
}

function solve(vectors: Vector[]): number {
    return countOverlaps(vectors.filter((v) => v.x1 === v.x2 || v.y1 === v.y2))
}

function solve2(vectors: Vector[]): number {
    return countOverlaps(vectors)
}

let example = parse(utils.getExampleLines(5, 1))
let data = parse(utils.getDataLines(5))

console.log(`Part 1 Example: ${solve(example)}`)
console.log(`Part 1 Answer: ${solve(data)}`)

console.log(`Part 2 Example: ${solve2(example)}`)
console.log(`Part 2 Answer: ${solve2(data)}`)
