from math import prod


class Packet:
    def __init__(self, version, type, literal, subpackets):
        self.version = version
        self.type = type
        self.literal = literal
        self.subpackets = subpackets

    def sum_versions(self):
        v = self.version
        if(self.subpackets is not None):
            v += sum([x.sum_versions() for x in self.subpackets])
        return v

    def compute(self):
        if self.literal is not None:
            return self.literal
        elif self.type == 0:
            return sum(x.compute() for x in self.subpackets)
        elif self.type == 1:
            return prod(x.compute() for x in self.subpackets)
        elif self.type == 2:
            return min(x.compute() for x in self.subpackets)
        elif self.type == 3:
            return max(x.compute() for x in self.subpackets)
        elif self.type == 5:
            return 1 if self.subpackets[0].compute() > self.subpackets[1].compute() else 0
        elif self.type == 6:
            return 1 if self.subpackets[0].compute() < self.subpackets[1].compute() else 0
        elif self.type == 7:
            return 1 if self.subpackets[0].compute() == self.subpackets[1].compute() else 0


def readData(file):
    f = open(file, 'r')
    return f.read()


def to_bit_array(hex_char):
    return bin(int(hex_char, 16))[2:].zfill(4)


def parse_packets(binary: str, num_packets=None):

    packets = []

    while (num_packets is None or len(packets) < num_packets) and binary.zfill(10) != '0000000000':

        version = int(binary[:3], 2)
        type = int(binary[3:6], 2)

        binary = binary[6:]

        if type == 4:
            literal_bits = []
            index = 0
            while True:
                bits = binary[index:index+5]
                literal_bits.append(bits[1:])
                index += 5
                if(bits[0] == '0'):
                    break

            literal = int(''.join(literal_bits), 2)
            packets.append(Packet(version, type, literal, None))
            binary = binary[index:]

        else:
            length_id = binary[0]

            if length_id == '0':
                length = int(binary[1:16], 2)
                sub_packets_binary = binary[16:length+16]
                sub_packets, _ = parse_packets(sub_packets_binary)
                packets.append(Packet(version, type, None, sub_packets))
                binary = binary[length+16:]
            else:
                num_sub_packets = int(binary[1:12], 2)
                binary = binary[12:]
                sub_packets, binary = parse_packets(binary, num_sub_packets)
                packets.append(Packet(version, type, None, sub_packets))

    return packets, binary


def part1(hex):
    binary = ''.join([to_bit_array(x) for x in hex])

    packets, _ = parse_packets(binary)

    return sum([x.sum_versions() for x in packets])


def part2(hex):
    binary = ''.join([to_bit_array(x) for x in hex])

    packets, _ = parse_packets(binary)

    return sum([x.compute() for x in packets])


data = readData('16/data.txt')

print(f"Part 1 Example 8A004A801A8002F478: {part1('8A004A801A8002F478')}")
print(f"Part 1 Example 620080001611562C8802118E34: {part1('620080001611562C8802118E34')}")
print(f"Part 1 Example C0015000016115A2E0802F182340: {part1('C0015000016115A2E0802F182340')}")
print(f"Part 1 Example A0016C880162017C3686B18A3D4780: {part1('A0016C880162017C3686B18A3D4780')}")
print(f"Part 1 Result: {part1(data)}")

print(f"Part 2 Example C200B40A82: {part2('C200B40A82')}")
print(f"Part 2 Example 04005AC33890: {part2('04005AC33890')}")
print(f"Part 2 Example 880086C3E88112: {part2('880086C3E88112')}")
print(f"Part 2 Example CE00C43D881120: {part2('CE00C43D881120')}")
print(f"Part 2 Example D8005AC2A8F0: {part2('D8005AC2A8F0')}")
print(f"Part 2 Example F600BC2D8F: {part2('F600BC2D8F')}")
print(f"Part 2 Example 9C005AC2F8F0: {part2('9C005AC2F8F0')}")
print(f"Part 2 Example 9C0141080250320F1802104A08: {part2('9C0141080250320F1802104A08')}")
print(f"Part 2 Result: {part2(data)}")
