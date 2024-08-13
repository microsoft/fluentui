const inRange = (a: number, b: number, range: number): boolean => {
  const r = range < 0 ? 0 : range;
  return Math.abs(a - b) <= r;
};

export const isLessThanInRange = (a: number, b: number, range: number): boolean => {
  return a < b && !inRange(a, b, range);
};
