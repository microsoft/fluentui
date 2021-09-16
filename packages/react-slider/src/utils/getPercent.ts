/**
 * Gets the current percent of specified value between a min and max
 *
 * @param value - the value to find the percent
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
export const getPercent = (value: number, min: number, max: number) => {
  return max === min ? 0 : ((value - min) / (max - min)) * 100;
};
