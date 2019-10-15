import { IColor } from './interfaces';
import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE } from './consts';
import { hsv2hex } from './hsv2hex';

/**
 * Converts a color hue to an HTML color string (with # prefix).
 * This implementation ignores all components of `color` except hue.
 */
export function getFullColorString(color: IColor): string {
  return `#${hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE)}`;
}
