/**
 * Adjusts the given value based on the transparency flag.
 *
 * @param value - The numeric value to adjust.
 * @param transparency - A boolean flag indicating whether to adjust for transparency.
 * @returns The adjusted value.
 */
export function adjustToTransparency(value: number, transparency: boolean): number {
  return transparency ? 100 - value : value;
}

/**
 * Calculates the transparency value based on the given parameters.
 *
 * @param transparency - A boolean flag indicating whether to adjust for transparency.
 * @param value - An optional numeric value to adjust.
 * @returns The calculated transparency value or undefined if the value is not provided.
 */
export function calculateTransparencyValue(transparency: boolean, value?: number): number | undefined {
  return value !== undefined ? adjustToTransparency(value * 100, transparency) : undefined;
}

/**
 * Determines the direction of the slider based on the given parameters.
 *
 * @param dir - The text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left).
 * @param vertical - A boolean indicating if the slider is vertical.
 * @param transparency - A boolean indicating if the slider is for transparency.
 * @returns The direction of the slider as a string representing degrees (e.g., '90deg').
 */
export function getSliderDirection(dir: 'ltr' | 'rtl', vertical: boolean, transparency: boolean): string {
  if (vertical) {
    return transparency ? '180deg' : '0deg';
  }
  return dir === 'ltr' && !transparency ? '90deg' : '-90deg';
}
