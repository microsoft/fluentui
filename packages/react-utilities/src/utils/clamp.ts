/**
 * Clamps `value` to a number between the min and max.
 *
 * @param value - the value to be clamped
 * @param min - the lowest valid value
 * @param max - the highest valid value
 */
export const clamp = (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value || 0));
