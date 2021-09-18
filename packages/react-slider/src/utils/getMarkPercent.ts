/**
 * Gets the current percentage position for the marks with respect to adjacent marks.
 * This is used primarily for positioning with CSS grid.
 *
 * @param markValues The marks percentage position relative to their individual positions.
 */
export const getMarkPercent = (markValues: number[]) => {
  const valueArray: number[] = markValues;
  const result: string[] = [];

  // For CSS grid to work the percents array must be remapped by the previous percent - the current percent
  if (valueArray.length > 0) {
    result.push(valueArray[0] + '% ');
    let prevPercent = valueArray[0];
    for (let i = 1; i < valueArray.length; i++) {
      result.push(valueArray[i] - prevPercent + '% ');
      prevPercent = valueArray[i];
    }
  }

  return result;
};
