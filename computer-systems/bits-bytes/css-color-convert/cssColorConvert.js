const fs = require('node:fs');

const hexCss = fs.readFileSync('simple.css', { encoding: 'utf8' });
const expected = fs.readFileSync('simple_expected.css', { encoding: 'utf8' });

const convertFromHexToRGB = (hexDocument) => {
  const hexRGBMap = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    a: 10,
    b: 11,
    c: 12,
    d: 13,
    e: 14,
    f: 15
  }

  let i = 0;
  let rgbDocument = '';

  while (i < hexDocument.length) {
    if (hexDocument[i] === '#') {
      const hex = hexDocument.substring(i + 1, i + 7);
      const rgbDigits = hex.split('').map((digit, index) => {
        if (index % 2 === 0) {
          return hexRGBMap[digit] * 16;
        }
        return hexRGBMap[digit];
      });

      const rgb = [];
      for (let i = 0; i < rgbDigits.length; i += 2) {
        rgb.push(String(rgbDigits[i] + rgbDigits[i + 1]));
      }
      const rgbString = `rgb(${rgb.join(' ')})`;

      rgbDocument += rgbString;
      i += 7;

    } else {
      rgbDocument += hexDocument[i];
      i++;
    }
  }
  return rgbDocument;
}

const result = convertFromHexToRGB(hexCss);

console.log('result equals expected', result === expected);