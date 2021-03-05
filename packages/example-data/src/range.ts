/**
 * Creates an array of incrementing numbers from a specified start and end value.
 * @internal
 */
export const range = (start: number, end: number): number[] => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
