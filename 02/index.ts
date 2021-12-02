import * as utils from '../utils'

type Direction = 'forward' | 'down' | 'up'
interface Command {
    direction: Direction
    units: number
}

function parseLine(line: string): Command {
    let split = line.split(' ')
    return {
        direction: split[0] as Direction,
        units: parseInt(split[1]),
    }
}

function solve(commands: Command[]): number {
    let x = 0,
        y = 0

    for (let command of commands) {
        if (command.direction === 'forward') x += command.units
        else if (command.direction === 'down') y += command.units
        else if (command.direction === 'up') y -= command.units
    }

    return x * y
}

function solve2(commands: Command[]): number {
    let x = 0,
        y = 0,
        aim = 0

    for (let command of commands) {
        if (command.direction === 'forward') {
            x += command.units
            y += command.units * aim
        } else if (command.direction === 'down') aim += command.units
        else if (command.direction === 'up') aim -= command.units
    }

    return x * y
}

let exampleLines = utils.getExampleLines(2, 1).map((x) => parseLine(x))
let dataLines = utils.getDataLines(2).map((x) => parseLine(x))

console.log(`Part 1 Example: ${solve(exampleLines)}`)
console.log(`Part 1 Answer: ${solve(dataLines)}`)

console.log(`Part 2 Example: ${solve2(exampleLines)}`)
console.log(`Part 2 Answer: ${solve2(dataLines)}`)
