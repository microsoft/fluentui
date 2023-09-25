import { MAX_COLOR_ALPHA, MAX_COLOR_RGB } from './consts';
import { clamp } from './clamp';
import type { IRGB } from './interfaces';

/** Corrects an RGB color to fall within the valid range.  */
export function correctRGB(color: IRGB): IRGB {
  return {
    r: clamp(color.r, MAX_COLOR_RGB),
    g: clamp(color.g, MAX_COLOR_RGB),
    b: clamp(color.b, MAX_COLOR_RGB),
    a: typeof color.a === 'number' ? clamp(color.a, MAX_COLOR_ALPHA) : color.a,
  };
}
