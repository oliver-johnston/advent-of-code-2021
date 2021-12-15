from typing import Counter


def readData(file):
    f = open(file, 'r')
    lines = f.read().split('\n')

    return [[int(x) for x in l] for l in lines]


def get_shortest_path(grid):
    paths = {0: [(0, 0)]}

    lowest_cost_to_point = {}

    while True:
        lowest_cost = min(paths)
        lowest_cost_paths = paths.pop(lowest_cost)

        for path in lowest_cost_paths:

            if path[0] == len(grid)-1 and path[1] == len(grid[0])-1:
                return lowest_cost

            neighbours = [(path[0] + 1, path[1]),
                          (path[0], path[1]+1),
                          (path[0] - 1, path[1]),
                          (path[0], path[1] - 1), ]
            neighbours = [n for n in neighbours if n[0] < len(grid)
                          and n[1] < len(grid[0])
                          and n[0] >= 0
                          and n[1] >= 0]

            for neighbour in neighbours:
                row = neighbour[0]
                col = neighbour[1]
                cost = lowest_cost + grid[row][col]
                # only continue with this path if we haven't alread reached this point a faster way
                if lowest_cost_to_point.get((row, col), 999999999) > cost:
                    lowest_cost_to_point[(row, col)] = cost
                    paths[cost] = paths.get(cost, []) + [(row, col)]


def build_part2_grid(grid):
    grid = [[x for x in y] for y in grid]

    height = len(grid)
    width = len(grid[0])

    for row in grid:
        for col in range(width, 5*width):
            value = row[col-width] + 1
            if value > 9:
                value = 1
            row.append(value)

    for rowIndex in range(height, 5*height):
        row = []
        grid.append(row)
        for col in range(0, 5*width):
            value = grid[rowIndex-height][col] + 1
            if value > 9:
                value = 1
            row.append(value)

    return grid


example = readData('15/example1.txt')
data = readData('15/data.txt')

print(f"Part 1 Example 1: {get_shortest_path(example)}")
print(f"Part 1 Result: {get_shortest_path(data)}")

example = build_part2_grid(example)
data = build_part2_grid(data)
print(f"Part 1 Example 1: {get_shortest_path(example)}")
print(f"Part 1 Result: {get_shortest_path(data)}")
