from collections import defaultdict
from typing import Counter
from math import ceil


def readData(file):
    f = open(file, 'r')
    lines = f.read().split('\n')

    polymer = lines[0]
    rules = dict([(line[0:2], line[6:]) for line in lines[2:]])
    return polymer, rules


def part1(polymer, rules, steps):
    for _ in range(0, steps):
        newPolymer = ''
        for i in range(0, len(polymer)-1):
            newPolymer += polymer[i]
            newPolymer += rules[polymer[i:i+2]]
        polymer = newPolymer + polymer[-1]

    counter = Counter(polymer)
    return max(counter.values()) - min(counter.values())


def part2(polymer, rules, steps):
    pairs = Counter([polymer[i:i+2] for i in range(0, len(polymer)-1)])

    for _ in range(0, steps):
        newpairs = Counter()
        for pair in pairs:
            count = pairs[pair]
            element = rules[pair]

            newpair1 = pair[0]+element
            newpairs[newpair1] += count

            newpair2 = element+pair[1]
            newpairs[newpair2] += count

        pairs = newpairs

    elementCounts = Counter(polymer[0])
    for pair in pairs:
        elementCounts[pair[1]] += pairs[pair]

    return max(elementCounts.values()) - min(elementCounts.values())


e1polymer, e1rules = readData('14/example1.txt')
polymer, rules = readData('14/data.txt')

print(f"Part 1 Example 1: {part2(e1polymer, e1rules, 10)}")
print(f"Part 1 Result: {part2(polymer, rules, 10)}")

print(f"Part 2 Example 1: {part2(e1polymer, e1rules, 40)}")
print(f"Part 2 Result: {part2(polymer, rules, 40)}")
