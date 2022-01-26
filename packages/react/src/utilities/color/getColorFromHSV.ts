import { MAX_COLOR_ALPHA } from './consts';
import { hsv2rgb } from './hsv2rgb';
import { hsv2hex } from './hsv2hex';
import { _rgbaOrHexString } from './_rgbaOrHexString';
import type { IHSV, IColor } from './interfaces';

/**
 * Converts an HSV color (and optional alpha value) to a color object.
 * If `a` is not given, a default of 100 is used.
 * Hex in the returned value will *not* be prefixed with #.
 * If `a` is unspecified or 100, the result's `str` property will contain a hex value
 * (*not* prefixed with #)
 */
export function getColorFromHSV(hsv: IHSV, a?: number): IColor {
  const { h, s, v } = hsv;
  a = typeof a === 'number' ? a : MAX_COLOR_ALPHA;

  const { r, g, b } = hsv2rgb(h, s, v);
  const hex = hsv2hex(h, s, v);
  const str = _rgbaOrHexString(r, g, b, a, hex);
  const t = MAX_COLOR_ALPHA - a;

  return { a, b, g, h, hex, r, s, str, v, t };
}
