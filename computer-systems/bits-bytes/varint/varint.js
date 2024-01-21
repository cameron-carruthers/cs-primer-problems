const fs = require('node:fs');

const intOne = fs.readFileSync('1.uint64').readBigUInt64BE();
const int150 = fs.readFileSync('150.uint64').readBigUInt64BE();
const intMax = fs.readFileSync('maxint.uint64').readBigUInt64BE();

const encode = (num) => {
  const bitChunks = [];
  let remainingNum = num;

  while (remainingNum > BigInt(0)) {
    // use a bitmask here instead
    let lowestBits = BigInt(remainingNum) % BigInt(128);

    remainingNum >>= BigInt(7);

    if (remainingNum > BigInt(0)) {
      // use bitwise operator here instead 
      lowestBits += BigInt(128)
    }

    // Buffer.from needs these to be Numbers, not BigInts
    bitChunks.push(Number(lowestBits));
  }

  return Buffer.from(bitChunks);
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

  return sevenBitSections.reduce((acc, curr, i) => {
    acc += BigInt(curr);
    if (i === sevenBitSections.length - 1) {
      return acc;
    }
    acc <<= BigInt(7);
    return acc;
  }, BigInt(0))
}

const intOneEncode = encode(intOne);
const intOneDecode = decode(intOneEncode);
console.log('intOne equals intOneDecode', intOne === intOneDecode);

const int150Encode = encode(int150);
const int150Decode = decode(int150Encode);
console.log('int150 equals int150Decode', int150 === int150Decode);

const intMaxEncode = encode(intMax);
const intMaxDecode = decode(intMaxEncode);
console.log('intMax equals intMaxDecode', intMax === intMaxDecode);