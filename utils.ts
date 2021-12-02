import * as fs from 'fs'

export function getDataLines(day: number): string[] {
    return getDataString(day).split(/\r?\n/)
}

export function getExampleLines(day: number, example: number): string[] {
    return getExampleString(day, example).split(/\r?\n/)
}

export function getDataString(day: number): string {
    return fs.readFileSync(`./${getDay(day)}/data.txt`).toString()
}

export function getExampleString(day: number, example: number): string {
    return fs.readFileSync(`./${getDay(day)}/example${example}.txt`).toString()
}

export function getDay(day: number): string {
    return ('00' + day).slice(-2)
}
