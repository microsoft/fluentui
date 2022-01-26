import { MAX_COLOR_ALPHA } from './consts';
import { rgb2hsv } from './rgb2hsv';
import { rgb2hex } from './rgb2hex';
import { _rgbaOrHexString } from './_rgbaOrHexString';
import type { IRGB, IColor } from './interfaces';

/** Converts an RGBA color to a color object (alpha defaults to 100). */
export function getColorFromRGBA(rgba: IRGB): IColor {
  const { a = MAX_COLOR_ALPHA, b, g, r } = rgba;
  const { h, s, v } = rgb2hsv(r, g, b);
  const hex = rgb2hex(r, g, b);
  const str = _rgbaOrHexString(r, g, b, a, hex);
  const t = MAX_COLOR_ALPHA - a;

  return { a, b, g, h, hex, r, s, str, v, t };
}
