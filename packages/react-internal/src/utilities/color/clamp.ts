/** Clamp a value to ensure it falls within a given range. */
export function clamp(value: number, max: number, min = 0): number {
  return value < min ? min : value > max ? max : value;
}
