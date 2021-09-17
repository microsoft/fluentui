import { clamp } from './clamp';

/**
 * Clamps and sorts the values in RangedSlider to a given min and max
 */
export const validateRangedThumbValues = (thumbValues: [number, number], min: number, max: number): [number, number] =>
  thumbValues.map(value => clamp(value, min, max)).sort((a, b) => a - b) as [number, number];
