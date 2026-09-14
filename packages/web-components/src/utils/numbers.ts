// Copied from @microsoft/fast-web-utilities

/**
 * Ensures that a value is between a min and max value. If value is lower than min, min will be returned.
 * If value is greater than max, max will be returned.
 */
export function limit(min: number, max: number, value: number): number {
  return Math.min(Math.max(value, min), max);
}
