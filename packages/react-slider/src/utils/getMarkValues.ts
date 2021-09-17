import { getPercent } from './getPercent';

/**
 * Gets the current percentage position for the marks with relative to the rail.
 *
 * Example
 * `Rail: width = 100px`
 * `Marks: [0, 25, 50, 75, 100]`
 * `getMarkValue: 0%, 25%, 50%, 75%, 100%`
 */
export const getMarkValue = (marks: boolean | number[] | undefined, min: number, max: number, step: number) => {
  const valueArray: number[] = [];

  // 1. We receive a boolean: mark for every step.
  if (typeof marks === 'boolean' && marks === true) {
    for (let i = 0; i < (max - min) / step + 1; i++) {
      valueArray.push(getPercent(min + step * i, min, max));
    }
  } else if (Array.isArray(marks) && marks.length > 0) {
    // 2. We receive an array with numbers: mark for every value in array.
    return marks.map(marksItem => getPercent(min + marksItem, min, max));
  }

  return valueArray;
};
