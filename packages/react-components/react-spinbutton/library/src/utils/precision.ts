/**
 * Calculates a number's precision based on the number of trailing
 * zeros if the number does not have a decimal indicated by a negative
 * precision. Otherwise, it calculates the number of digits after
 * the decimal point indicated by a positive precision.
 * @param value - the value to determine the precision of
 */
export function calculatePrecision(value: number | string): number {
  /**
   * Group 1:
   * [1-9]([0]+$) matches trailing zeros
   * Group 2:
   * \.([0-9]*) matches all digits after a decimal point.
   */
  const groups = /[1-9]([0]+$)|\.([0-9]*)/.exec(String(value));
  if (!groups) {
    return 0;
  }
  if (groups[1]) {
    return -groups[1].length;
  }
  if (groups[2]) {
    return groups[2].length;
  }
  return 0;
}

/**
 * Rounds a number to a certain level of precision. Accepts negative precision.
 * @param value - The value that is being rounded.
 * @param precision - The number of decimal places to round the number to
 */
export function precisionRound(value: number, precision: number, base: number = 10): number {
  const exp = Math.pow(base, precision);
  return Math.round(value * exp) / exp;
}
