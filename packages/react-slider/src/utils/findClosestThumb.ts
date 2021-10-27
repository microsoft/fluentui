/**
 * Finds the closest thumb based of a given value and returns it's key.
 */
export const findClosestThumb = (thumbArray: [number, number], incomingValue: number) => {
  return Math.abs(incomingValue - thumbArray[0]) <= Math.abs(thumbArray[1] - incomingValue)
    ? 'lowerValue'
    : 'upperValue';
};
