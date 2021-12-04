import * as utils from '../utils'
import * as _ from 'lodash'

class Board {
    numbers: number[][]

    constructor(numbers: number[][]) {
        this.numbers = numbers
    }

    mark(number: number) {
        for (let i = 0; i < this.numbers.length; i++) {
            let row = this.numbers[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] === number) {
                    row[j] = -1
                }
            }
        }
    }

    isFinished(): boolean {
        for (let i = 0; i < this.numbers.length; i++) {
            if (_.every(this.numbers[i], (x) => x === -1)) return true
        }

        for (let j = 0; j < this.numbers[0].length; j++) {
            var col = _.range(0, this.numbers.length).map((i) => this.numbers[i][j])
            if (_.every(col, (x) => x === -1)) return true
        }

        return false
    }

    score(): number {
        let score = 0
        for (let i = 0; i < this.numbers.length; i++) {
            let row = this.numbers[i]
            for (let j = 0; j < row.length; j++) {
                if (row[j] >= 0) {
                    score += row[j]
                }
            }
        }
        return score
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
    for (let number of numbers) {
        boards.forEach((b) => b.mark(number))

        let finished = _.chain(boards)
            .filter((b) => b.isFinished())
            .first()
            .value()
        if (finished != null) {
            return finished.score() * number
        }
    }

    return 0
}

function solve2(numbers: number[], boards: Board[]): number {
    for (let number of numbers) {
        boards.forEach((b) => b.mark(number))

        if (boards.length > 1) {
            boards = boards.filter((b) => !b.isFinished())
        }

        if (boards.length === 1 && boards[0].isFinished()) {
            return boards[0].score() * number
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
