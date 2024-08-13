import { MAX_COLOR_SATURATION, MAX_COLOR_VALUE } from './consts';
import type { IHSL } from './interfaces';

/** Converts HSV components to an HSL color. */
export function hsv2hsl(h: number, s: number, v: number): IHSL {
  s /= MAX_COLOR_SATURATION;
  v /= MAX_COLOR_VALUE;

  let l = (2 - s) * v;
  let sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return { h, s: sl * 100, l: l * 100 };
}
