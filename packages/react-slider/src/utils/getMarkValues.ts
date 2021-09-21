import { getPercent } from './getPercent';

/**
 * Gets the current percentage position for the marks with relative to the rail.
 *
 * Example
 * - `Rail: width = 100px`
 * - `Marks: [0, 25, 50, 75, 100]`
 * - `getMarkValue: 0%, 25%, 50%, 75%, 100%`
 */
export const getMarkValue = (
  marks: boolean | (number | { value: number; label?: string | JSX.Element; mark?: JSX.Element })[] | undefined,
  min: number,
  max: number,
  step: number,
) => {
  const valueArray: number[] = [];

  // 1. We receive a boolean: mark for every step.
  if (typeof marks === 'boolean' && marks === true) {
    for (let i = 0; i < (max - min) / step + 1; i++) {
      valueArray.push(getPercent(min + step * i, min, max));
    }
  } else if (Array.isArray(marks) && marks.length > 0) {
    return marks.map(marksItem =>
      typeof marksItem === 'number'
        ? // 2. We receive an array with numbers: mark for every value in array.
          getPercent(min + marksItem, min, max)
        : // 3. We receive an array with objects containing numbers and strings:
          // mark and label for every value + string in each object.
          getPercent(min + marksItem.value, min, max),
    );
  }
  return valueArray;
};
