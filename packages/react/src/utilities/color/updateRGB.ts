import { getColorFromRGBA } from './getColorFromRGBA';
import type { IColor, IRGB } from './interfaces';

/**
 * Gets a color with a single RGBA component updated to a new value.
 * Does not modify the original `color`. Alpha defaults to 100 if not set.
 */
export function updateRGB(color: IColor, component: keyof IRGB, value: number): IColor {
  return getColorFromRGBA({
    r: color.r,
    g: color.g,
    b: color.b,
    a: color.a,
    [component]: value,
  });
}
