
from typing import Tuple


class Point:
    def __init__(self, x, y) -> None:
        self.x = x
        self.y = y


class Area:
    def __init__(self, x1, y1, x2, y2) -> None:
        self.minX = min(x1, x2)
        self.minY = min(y1, y2)
        self.maxX = max(x1, x2)
        self.maxY = max(y1, y2)

    def is_within_area(self, point: Point) -> bool:
        return (self.minX <= point.x <= self.maxX and self.minY <= point.y <= self.maxY)


def step(location: Point, velocity: Point) -> Tuple[Point, Point]:
    location = Point(location.x + velocity.x, location.y + velocity.y)
    velocity = Point(max(0, velocity.x - 1), velocity.y - 1)
    return (location, velocity)


def get_highest_point(location: Point, velocity: Point, target: Area) -> int:
    highest = location.y
    while location.x <= target.maxX and location.y >= target.minY:
        (location, velocity) = step(location, velocity)
        if location.y > highest:
            highest = location.y
        if target.is_within_area(location):
            return highest
    return None


def part1(target: Area):
    for x in range(1, 100):
        for y in reversed(range(1, 500)):
            z = get_highest_point(Point(0, 0), Point(x, y), target)
            if z is not None:
                return z
    return None


def part2(target: Area):
    counter = 0
    for x in range(1, target.maxX+10):
        for y in range(target.minY-10, 500):
            if get_highest_point(Point(0, 0), Point(x, y), target) is not None:
                counter += 1
    return counter


example = Area(20, -10, 30, -5)
data = Area(217, -126, 240, -69)

#print(f'Part 1 Example: {part1(example)}')
#print(f'Part 1 Result: {part1(data)}')

print(f'Part 2 Example: {part2(example)}')
print(f'Part 2 Result: {part2(data)}')
