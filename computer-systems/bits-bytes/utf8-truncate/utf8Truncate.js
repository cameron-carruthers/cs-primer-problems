let fs = require('node:fs');

const buffer = fs.readFileSync('cases');

const lines = [];
let currentLine = [];

for (const value of buffer) {
  // if this is a new line, add the max length
  // as the first character in the tuple
  if (!currentLine.length) {
    currentLine.push(value, [])
  // if this is the end of the line, add it to the lines
  // array and reset. Don't add the newline character.
  } else if (value === 0x0a) {
    lines.push(currentLine);
    currentLine = [];
  // otherwise, this is a character in the middle of the line
  // Add it to an array in the 2nd half of the tuple
  } else {
    currentLine[1].push(value);
  }
}
// If file doesn't end with a newline, push final line
lines.push(currentLine);

const truncatedLines = lines.map(([ maxLength, line ]) => {
  if (maxLength === undefined) {
    return line;
  }

  const buffer = Buffer.from(line);
  const trunc = buffer.subarray(0, maxLength);

  let pointer = trunc.length - 1
  // move pointer back to the byte that encodes
  // length of unicode character
  while (trunc[pointer] >> 6 === 2) {
    pointer--;
  }

  let index = 7;
  let numBytes = 0;
  let mask = 0x80;

  while ((trunc[pointer] & mask) >> index === 1) {
    numBytes++;
    index--;
    mask >>= 1;
  }

  if (pointer + numBytes > trunc.length) {
    return trunc.subarray(0, pointer).toString();
  }
  return trunc.toString();
});
const result = truncatedLines.join('\n');
console.log({ result });

const expected = fs.readFileSync('expected', 'utf8');
console.log({ expected });
console.log(expected === result);