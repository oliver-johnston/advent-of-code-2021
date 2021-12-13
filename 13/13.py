

def readData(file):
    f = open(file, 'r')
    split = f.read().split('\n\n')

    points = [[int(num) for num in line.split(',')]
              for line in split[0].split('\n')]
    instructions = split[1].split('\n')

    return points, instructions


def fold_vertical(points, y):
    above_line = [p for p in points if p[1] < y]
    below_line = [p for p in points if p[1] > y]

    return above_line + [[p[0], 2 * y - p[1]] for p in below_line]


def fold_horizontal(points, x):
    left_of_line = [p for p in points if p[0] < x]
    right_of_line = [p for p in points if p[0] > x]

    return left_of_line + [[2*x - p[0], p[1]] for p in right_of_line]


def apply_instruction(points, instruction):
    split = instruction.split('=')
    if split[0] == "fold along x":
        return fold_horizontal(points, int(split[1]))
    else:
        return fold_vertical(points, int(split[1]))


def print_points(points):
    max_x = max([p[0] for p in points])
    max_y = max([p[1] for p in points])

    for y in range(0, max_y+1):
        for x in range(0, max_x + 1):
            if [x, y] in points:
                print('#', end='')
            else:
                print('.', end='')
        print()


def part1(points, instructions):
    points = apply_instruction(points, instructions[0])
    return len(set(f'{p[0]}_{p[1]}' for p in points))


def part2(points, instructions):
    for i in instructions:
        points = apply_instruction(points, i)
    return points


example1Points, example1Instructions = readData("13/example1.txt")
print(f'Part 1 Example 1: {part1(example1Points, example1Instructions)}')

data1Points, data1Instructions = readData("13/data.txt")
print(f'Part 1 Final Answer: {part1(data1Points, data1Instructions)}')


part2Example = print_points(part2(example1Points, example1Instructions))
print(f'Part 2 Example 1: {part2Example}')

part2Answer = print_points(part2(data1Points, data1Instructions))
print(f'Part 2 Final Answer: {part2Answer}')
