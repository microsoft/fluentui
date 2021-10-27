import { hsl2hsv } from './hsl2hsv';
import { hsv2rgb } from './hsv2rgb';
import type { IRGB } from './interfaces';

/** Converts HSL components to an RGB color. Does not set the alpha value. */
export function hsl2rgb(h: number, s: number, l: number): IRGB {
  const hsv = hsl2hsv(h, s, l);

  return hsv2rgb(hsv.h, hsv.s, hsv.v);
}
