def getLines(file):
    f = open(file, "r")
    return [[int(y) for y in x] for x in f.read().split('\n')]


def getNeighbours(grid, row, col):
    neighbours = []
    for i in range(-1, 2):
        for j in range(-1, 2):
            if row + i >= 0 and row + i < len(grid) and col + j >= 0 and col + j < len(grid[0]) and (i, j) != (0, 0):
                neighbours.append((row+i, col+j))
    return neighbours


def doFlash(grid, row, col, flashed):
    if (row, col) in flashed:
        return

    if grid[row][col] < 10:
        return

    flashed.add((row, col))

    for neighbour in getNeighbours(grid, row, col):
        grid[neighbour[0]][neighbour[1]] += 1
        if grid[neighbour[0]][neighbour[1]] >= 9:
            doFlash(grid, neighbour[0], neighbour[1], flashed)


def countFlashes(grid, steps, part2=False):

    flashes = 0

    for step in range(0, steps):

        flashed = set()

        grid = [[col + 1 for col in row] for row in grid]

        for row in range(0, len(grid)):
            for col in range(0, len(grid[row])):
                if(grid[row][col] > 9):
                    doFlash(grid, row, col, flashed)

        grid = [[0 if col > 9 else col for col in row] for row in grid]

        flashes += len(flashed)

        if part2 and len(flashed) == len(grid) * len(grid[0]):
            return step

    return flashes


#example1 = getLines('11/example1.txt')
#print(f'Part 1 Example 1: {countFlashes(example1, 100)}')

example2 = getLines('11/example2.txt')
print(f'Part 1 Example 2: {countFlashes(example2, 100)}')

data = getLines('11/data.txt')
print(f'Part 1 Final Answer: {countFlashes(data, 100)}')

example2 = getLines('11/example2.txt')
print(f'Part 2 Example 2: {countFlashes(example2, 999, True) + 1}')

data = getLines('11/data.txt')
print(f'Part 2 Final Answer: {countFlashes(data, 999, True) + 1}')
