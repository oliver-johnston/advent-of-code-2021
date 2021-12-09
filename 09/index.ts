import * as utils from '../utils'
import * as _ from 'lodash'

interface Point {
    row: number
    col: number
}

function parseLine(line: string): number[] {
    return line.split('').map((x) => parseInt(x))
}

function getNeighbourCoords(point: Point, grid: number[][]): Point[] {
    return [
        { row: point.row - 1, col: point.col },
        { row: point.row + 1, col: point.col },
        { row: point.row, col: point.col - 1 },
        { row: point.row, col: point.col + 1 },
    ].filter((x) => x.row >= 0 && x.col >= 0 && x.row < grid.length && x.col < grid[0].length)
}

function solve(grid: number[][]): number {
    const lowPoints = []

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const height = grid[row][col]
            const neighbours = getNeighbourCoords({ row: row, col: col }, grid).map((x) => grid[x.row][x.col])
            if (_.every(neighbours, (n) => n > height)) {
                lowPoints.push(height)
            }
        }
    }

    return _.sum(lowPoints.map((l) => l + 1))
}

function getBasin(point: Point, grid: number[][], visited: Set<string>): number[] {
    const key = `${point.col}_${point.row}`
    if (visited.has(key)) {
        return []
    }

    visited.add(key)

    const value = grid[point.row][point.col]
    if (value === 9) {
        return []
    }

    const neighbours = getNeighbourCoords(point, grid)
    return [value, ...neighbours.flatMap((n) => getBasin(n, grid, visited))]
}

function solve2(grid: number[][]): number {
    const basinSizes = []
    const visited = new Set<string>()
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            basinSizes.push(getBasin({ row: row, col: col }, grid, visited).length)
        }
    }

    const threeLargest = _.chain(basinSizes)
        .orderBy((b) => b, 'desc')
        .take(3)
        .value()

    return threeLargest[0] * threeLargest[1] * threeLargest[2]
}

let example = utils.getExampleLines(9, 1).map(parseLine)
let data = utils.getDataLines(9).map(parseLine)

console.log(`Part 1 Example: ${solve(example)}`)
console.log(`Part 1 Answer: ${solve(data)}`)

console.log(`Part 2 Example: ${solve2(example)}`)
console.log(`Part 2 Answer: ${solve2(data)}`)
