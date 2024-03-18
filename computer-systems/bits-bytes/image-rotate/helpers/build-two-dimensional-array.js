const buildTwoDimensionalArray = (pictureBuffer, width) => {
  const array = [];
  let tempRow = [];
  let tempRgbGroup = [];
  for (const byte of pictureBuffer) {
    tempRgbGroup.push(byte);
    if (tempRgbGroup.length === 3) {
      tempRow.push(tempRgbGroup);
      tempRgbGroup = [];
    }
    if (tempRow.length === width) {
      array.push(tempRow);
      tempRow = [];
    }
  }
  return array;
}

module.exports = { buildTwoDimensionalArray };