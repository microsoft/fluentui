import { MAX_COLOR_RGB } from './consts';
import type { IHSV } from './interfaces';

/** Converts RGB components to an HSV color. */
export function rgb2hsv(r: number, g: number, b: number): IHSV {
  let h = NaN;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // hue
  if (delta === 0) {
    h = 0;
  } else if (r === max) {
    h = ((g - b) / delta) % 6;
  } else if (g === max) {
    h = (b - r) / delta + 2;
  } else if (b === max) {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  // saturation
  const s = Math.round((max === 0 ? 0 : delta / max) * 100);

  // value
  const v = Math.round((max / MAX_COLOR_RGB) * 100);

  return { h, s, v };
}
