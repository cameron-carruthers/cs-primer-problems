const fs = require('node:fs');
const { Buffer } = require('node:buffer');
const { buildTwoDimensionalArray } = require('./helpers/build-two-dimensional-array');
const { rotateTwoDimensionalArray } = require('./helpers/rotate-two-dimensional-array');

const picture = fs.readFileSync('teapot.bmp');
const offset = picture.readUIntLE(10, 1); 
const width = picture.readIntLE(18, 4);

const headers = Array.from(picture.subarray(0, offset));

const source = buildTwoDimensionalArray(picture.subarray(offset), width);
const rotated = rotateTwoDimensionalArray(source, width);
const buffer = Buffer.from(headers.concat(rotated).flat().flat());

fs.writeFileSync('rotated.bmp', buffer);