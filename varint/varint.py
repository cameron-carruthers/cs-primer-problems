import struct

with open('1.uint64', 'rb') as f:
  int_1 = struct.unpack('>Q', f.read())[0]

with open('150.uint64', 'rb') as f:
  int_150 = struct.unpack('>Q', f.read())[0]

with open('maxint.uint64', 'rb') as f:
  int_max = struct.unpack('>Q', f.read())[0]

def encode(int):
  bit_chunks = []
  remaining_num = int

  while remaining_num > 0:
    lowest_bits = remaining_num % 128
    bit_chunks.append(lowest_bits)
    remaining_num >>= 7
  
  return(bytes(bit_chunks))



int_1_result = encode(int_1)
print('int_1_result', int_1_result)

int_150_result = encode(int_150)
print('int_150_result', int_150_result)

int_max_result = encode(int_max)
print({ int_max });
print('int_max_result', int_max_result)