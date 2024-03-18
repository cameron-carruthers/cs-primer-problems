const rotateTwoDimensionalArray = (twoDimensionalArray, width) => {
  const rotatedTwoDimensionalArray = Array.from({ length: width }, () => []);

  for (let i = 0; i < twoDimensionalArray.length; i++) {
    for (let j = 0; j < twoDimensionalArray[i].length; j++) {
      rotatedTwoDimensionalArray[twoDimensionalArray.length - 1 - j]
        .push(twoDimensionalArray[i][j]);
    }
  }
  return rotatedTwoDimensionalArray;
}

module.exports = { rotateTwoDimensionalArray };