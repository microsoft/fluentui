import { hsv2rgb } from './hsv2rgb';
import { rgb2hex } from './rgb2hex';
import { _rgbaOrHexString } from './_rgbaOrHexString';
import type { IColor } from './interfaces';

/**
 * Gets a color with the same hue as `color` and other components updated to match the given
 * saturation and value.
 *
 * Does not modify the original `color` and does not supply a default alpha value.
 */
export function updateSV(color: IColor, s: number, v: number): IColor {
  const { r, g, b } = hsv2rgb(color.h, s, v);
  const hex = rgb2hex(r, g, b);

  return {
    ...color,
    s,
    v,
    r,
    g,
    b,
    hex,
    str: _rgbaOrHexString(r, g, b, color.a, hex),
  };
}
