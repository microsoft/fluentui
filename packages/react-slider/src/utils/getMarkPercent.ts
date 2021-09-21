/**
 * Gets the current percentage position for the marks with respect to adjacent marks.
 * This is used primarily for positioning with [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid).
 *
 * Example
 * - `Rail: width = 100px`
 * - `Marks: [0, 25, 50, 75, 100]`
 * - `getMarkPercent: 0%, 25%, 25%, 25%, 25%`
 *
 * @param markValues The marks percentage position relative to their individual positions.
 */
export const getMarkPercent = (markValues: number[]) => {
  const result: string[] = [];

  // For CSS grid to work the percents array must be remapped by the previous percent - the current percent
  if (markValues.length > 0) {
    result.push(markValues[0] + '% ');
    let prevPercent = markValues[0];
    for (let i = 1; i < markValues.length; i++) {
      result.push(markValues[i] - prevPercent + '% ');
      prevPercent = markValues[i];
    }
  }

  return result;
};
