import type { IHSV } from './interfaces';

/** Converts HSL components to an HSV color. */
export function hsl2hsv(h: number, s: number, l: number): IHSV {
  s *= (l < 50 ? l : 100 - l) / 100;
  const v = l + s;

  return {
    h,
    s: v === 0 ? 0 : ((2 * s) / v) * 100,
    v,
  };
}
