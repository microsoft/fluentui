import { MAX_COLOR_RGB } from './consts';
import type { IRGB } from './interfaces';

/** Converts HSV components to an RGB color. Does not set the alpha value. */
export function hsv2rgb(h: number, s: number, v: number): IRGB {
  s = s / 100;
  v = v / 100;

  let rgb: number[] = [];

  const c = v * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = v - c;

  switch (Math.floor(hh)) {
    case 0:
      rgb = [c, x, 0];
      break;

    case 1:
      rgb = [x, c, 0];
      break;

    case 2:
      rgb = [0, c, x];
      break;

    case 3:
      rgb = [0, x, c];
      break;

    case 4:
      rgb = [x, 0, c];
      break;

    case 5:
      rgb = [c, 0, x];
      break;
  }

  return {
    r: Math.round(MAX_COLOR_RGB * (rgb[0] + m)),
    g: Math.round(MAX_COLOR_RGB * (rgb[1] + m)),
    b: Math.round(MAX_COLOR_RGB * (rgb[2] + m)),
  };
}
