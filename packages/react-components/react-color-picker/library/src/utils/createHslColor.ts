import type { HslColor, HsvColor } from '../types/color';

/**
 *
 * Creates an HSL color object from a given HSV color object.
 *
 * @param color - HSV color object to convert to HSL.
 * @returns HSL color object with the same hue and alpha values, and converted saturation and lightness values.
 */
export function createHslColor(color: Partial<HsvColor> = {}): HslColor {
  const { h = 0, s = 0, v = 0, a = 1 } = color;
  const l = v * (1 - s / 2);
  const hslSaturation = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);

  return { h, s: hslSaturation, l, a };
}

/**
 * Creates an HSL color string from a given HSV color object.
 *
 * @param color - HSV color object to convert to HSL string.
 * @returns - HSL color string in the format of "hsla(h, s%, l%, a)".
 */
export function createHslColorString(color: Partial<HsvColor> = {}): string {
  const hslColor = createHslColor(color);
  const saturation = Number((hslColor.s * 100).toFixed(2));
  const lightness = Number((hslColor.l * 100).toFixed(2));

  return `hsla(${hslColor.h}, ${saturation}%, ${lightness}%, ${hslColor.a})`;
}
