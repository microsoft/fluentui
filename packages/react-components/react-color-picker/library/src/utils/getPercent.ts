/**
 * Calculates the percentage of a value within a given range.
 *
 * @param value - The value to be converted to a percentage.
 * @param min - The minimum value of the range.
 * @param max - The maximum value of the range.
 * @returns The percentage representation of the value within the range [min, max].
 *          Returns 0 if `min` is equal to `max`.
 */
export const getPercent = (value: number, min: number, max: number): number => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};
