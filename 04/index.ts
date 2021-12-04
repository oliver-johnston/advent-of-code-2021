import * as utils from '../utils'
import * as _ from 'lodash'

class Board {
    numbers: number[][]

    constructor(numbers: number[][]) {
        this.numbers = numbers
    }

    isFinished(results: number[]): boolean {
        let toCheck = [...this.numbers, ..._.zip(...this.numbers)]
        return toCheck.some((row) => row.every((n) => results.includes(n as number)))
    }

    score(results: number[]): number {
        return _.chain(this.numbers)
            .flatten()
            .filter((n) => !results.includes(n))
            .sum()
            .value()
    }
}

function parse(data: string): [numbers: number[], boards: Board[]] {
    let numbers = data
        .split('\r\n')[0]
        .split(',')
        .map((x) => parseInt(x))

    let boards = _.chain(data.split('\r\n\r\n'))
        .drop(1)
        .map((x) => parseBoard(x))
        .value()

    return [numbers, boards]
}

function parseBoard(board: string): Board {
    let numbers = _.chain(board.split('\r\n'))
        .map((line) =>
            line
                .trim()
                .split(/[ ]+/)
                .map((x) => parseInt(x))
        )
        .value()
    return new Board(numbers)
}

function solve(numbers: number[], boards: Board[]): number {
    let results: number[] = []

    for (let number of numbers) {
        results.push(number)

        let finished = _.chain(boards)
            .filter((b) => b.isFinished(results))
            .first()
            .value()
        if (finished != null) {
            return finished.score(results) * number
        }
    }

    return 0
}

function solve2(numbers: number[], boards: Board[]): number {
    let results: number[] = []

    for (let number of numbers) {
        results.push(number)

        if (boards.length > 1) {
            boards = boards.filter((b) => !b.isFinished(results))
        }

        if (boards.length === 1 && boards[0].isFinished(results)) {
            return boards[0].score(results) * number
        }
    }

    return 0
}

let example = parse(utils.getExampleString(4, 1))
let data = parse(utils.getDataString(4))

console.log(`Part 1 Example: ${solve(example[0], example[1])}`)
console.log(`Part 1 Answer: ${solve(data[0], data[1])}`)

console.log(`Part 2 Example: ${solve2(example[0], example[1])}`)
console.log(`Part 2 Answer: ${solve2(data[0], data[1])}`)
