import math
from os import read


class Pair:
    def __init__(self, left, right) -> None:
        self.left = left
        self.right = right

    def __str__(self) -> str:
        return f'[{self.left.__str__()},{self.right.__str__()}]'

    def __repr__(self) -> str:
        return self.__str__()

    def split(self):
        return self.split_left() or self.split_right()

    def split_left(self):
        if isinstance(self.left, Pair):
            return self.left.split()
        elif self.left > 9:
            self.left = Pair(math.floor(self.left / 2), math.ceil(self.left / 2))
            return True
        return False

    def split_right(self):
        if isinstance(self.right, Pair):
            return self.right.split()
        elif self.right > 9:
            self.right = Pair(math.floor(self.right / 2), math.ceil(self.right / 2))
            return True
        return False

    def is_base_pair(self):
        return isinstance(self.left, int) and isinstance(self.right, int)

    def explode(self, depth=0):
        if self.is_base_pair():
            if depth >= 4:
                res = (True, self.left, self.right, True)
                self.left = 0
                self.right = 0
                return res
            else:
                return (False, 0, 0, False)

        if isinstance(self.left, Pair):
            exploded, left, right, zero = self.left.explode(depth + 1)

            if exploded:

                if zero:
                    self.left = 0

                if isinstance(self.right, int):
                    self.right += right
                else:
                    self.right.add_left_most(right)

                return (True, left, 0, False)

        if isinstance(self.right, Pair):
            exploded, left, right, zero = self.right.explode(depth + 1)

            if exploded:

                if zero:
                    self.right = 0

                if isinstance(self.left, int):
                    self.left += left
                else:
                    self.left.add_right_most(left)

                return (True, 0, right, False)

        return (False, 0, 0, False)

    def add_left_most(self, num):
        if isinstance(self.left, int):
            self.left += num
        else:
            self.left.add_left_most(num)

    def add_right_most(self, num):
        if isinstance(self.right, int):
            self.right += num
        else:
            self.right.add_right_most(num)

    def magnitude(self):
        if isinstance(self.left, int):
            left = self.left
        else:
            left = self.left.magnitude()

        if isinstance(self.right, int):
            right = self.right
        else:
            right = self.right.magnitude()

        return left * 3 + right * 2

    def clone(self):
        if isinstance(self.left, int):
            left = self.left
        else:
            left = self.left.clone()

        if isinstance(self.right, int):
            right = self.right
        else:
            right = self.right.clone()

        return Pair(left, right)


def parse_pair(line, stack=[]):
    if len(line) == 0:
        return stack.pop()

    char = line[0]
    if '0' <= char <= '9':
        stack.append(int(char))
    elif char == ']':
        right = stack.pop()
        left = stack.pop()
        stack.append(Pair(left, right))

    return parse_pair(line[1:], stack)


def readData(file):
    f = open(file, 'r')
    lines = f.read().split('\n')

    return [parse_pair(l) for l in lines]


def reduce(pair):
    while True:
        exploded, _, _, _ = pair.explode()
        if exploded:
            continue

        split = pair.split()
        if split:
            continue

        break


def sum(pairs):
    left = pairs[0]
    for right in pairs[1:]:
        left = Pair(left, right)
        reduce(left)

    return left


def part1(pairs):
    pairs = [x.clone() for x in pairs]
    result = sum(pairs)
    return result.magnitude()


def part2(pairs):
    max = 0
    for x in pairs:
        for y in pairs:
            if x == y:
                continue
            magnitude = sum([x.clone(), y.clone()]).magnitude()
            if magnitude > max:
                max = magnitude
    return max


example = readData('18/example1.txt')
data = readData('18/data.txt')

print(f'Part 1 Example 1: {part1(example)}')
print(f'Part 1 Result: {part1(data)}')

print(f'Part 2 Example 1: {part2(example)}')
print(f'Part 2 Result: {part2(data)}')
