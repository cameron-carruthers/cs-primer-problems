const fs = require('node:fs');

const intOne = fs.readFileSync('1.uint64');
const int150 = fs.readFileSync('150.uint64');
const intMax = fs.readFileSync('maxint.uint64');

// use more accurate variable names

const encode = (buffer) => {

  const bitChunks = [];
  let remainingNum = buffer.readBigUInt64BE();
  while (remainingNum > BigInt(0)) {
    // use a bitmask
    const lowestBits = BigInt(remainingNum) % BigInt(128);

    bitChunks.push(lowestBits);
    remainingNum >>= BigInt(7);
  }

  // don't need to iterate through this a 2nd time
  const byteArray = bitChunks.map((bitChunk, index) => {
    if (index === bitChunks.length - 1) {
      return Number(bitChunk);
    }
    // use bitwise operator instead
    return Number(bitChunk + BigInt(128));
  })
  return Buffer.from(byteArray);
}

const decode = (buffer) => {
  const sevenBitSections = [];
  for (const value of buffer) {
    if (sevenBitSections.length === buffer.length - 1) {
      sevenBitSections.unshift(value);
    } else {
      // use bitwise operator instead
      sevenBitSections.unshift(value - 128);
    }
  }

  const bigInt = sevenBitSections.reduce((acc, curr, i) => {
    acc += BigInt(curr);
    if (i === sevenBitSections.length - 1) {
      return acc;
    }
    acc <<= BigInt(7);
    return acc;
  }, BigInt(0))

  const buf = Buffer.alloc(8);
  buf.writeBigUInt64BE(bigInt);

  return buf;
}

const intOneEncode = encode(intOne);
const intOneDecode = decode(intOneEncode);
console.log('intOne equals intOneDecode', intOne.compare(intOneDecode) === 0);

const int150Encode = encode(int150);
const int150Decode = decode(int150Encode);
console.log('int150 equals int150Decode', int150.compare(int150Decode) === 0);

const intMaxEncode = encode(intMax);
const intMaxDecode = decode(intMaxEncode);
console.log('intMax equals intMaxDecode', intMax.compare(intMaxDecode) === 0);