import re


def getLines(file):
    f = open(file, 'r')
    return [[y for y in x.split('-')] for x in f.read().split('\n')]


def getConnections(input):
    connections = {}
    for i in input:
        if i[0] in connections:
            connections[i[0]].append(i[1])
        else:
            connections[i[0]] = [i[1]]

        if i[1] in connections:
            connections[i[1]].append(i[0])
        else:
            connections[i[1]] = [i[0]]
    return connections


def getPaths(current: str, connections: dict, visited: dict, path: list, allowTwice: str):

    path = path + [current]

    if current == 'end':
        return [path]

    if re.match('[a-z].*', current):
        count = visited.get(current, 0)
        if (allowTwice == current and count == 2) or (allowTwice != current and count == 1):
            return []
        visited[current] = count + 1

    neigbours = connections.get(current)

    paths = []
    for neighbour in neigbours:
        nextPaths = getPaths(neighbour,
                             connections,
                             dict(visited),
                             path,
                             allowTwice)
        paths += [p for p in nextPaths if len(p) > 0]

    return [x for x in paths if len(x) > 0]


def countPaths(file):
    input = getLines(file)
    connections = getConnections(input)
    paths = getPaths('start', connections, dict(), [], '')
    return len(paths)


def countPaths2(file):
    input = getLines(file)
    connections = getConnections(input)
    smallCaves = [x for x
                  in connections.keys()
                  if re.match('[a-z].*', x) and x not in ['start', 'end']]
    paths = []
    for s in smallCaves:
        paths += getPaths('start', connections, dict(), [], s)

    strings = set(['_'.join(p) for p in paths])

    return len(strings)


print(f'Part 1 Example 1: {countPaths("12/example1.txt")}')
print(f'Part 1 Example 2: {countPaths("12/example2.txt")}')
print(f'Part 1 Example 3: {countPaths("12/example3.txt")}')
print(f'Part 1 Final Answer: {countPaths("12/data.txt")}')

print(f'Part 2 Example 1: {countPaths2("12/example1.txt")}')
print(f'Part 2 Example 2: {countPaths2("12/example2.txt")}')
print(f'Part 2 Example 3: {countPaths2("12/example3.txt")}')
print(f'Part 2 Final Answer: {countPaths2("12/data.txt")}')
