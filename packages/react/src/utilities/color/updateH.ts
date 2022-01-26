import { hsv2rgb } from './hsv2rgb';
import { rgb2hex } from './rgb2hex';
import { _rgbaOrHexString } from './_rgbaOrHexString';
import type { IColor } from './interfaces';

/**
 * Gets a color with the same saturation and value as `color` and the other components updated
 * to match the given hue.
 *
 * Does not modify the original `color` and does not supply a default alpha value.
 */
export function updateH(color: IColor, h: number): IColor {
  const { r, g, b } = hsv2rgb(h, color.s, color.v);
  const hex = rgb2hex(r, g, b);

  return {
    ...color,
    h,
    r,
    g,
    b,
    hex,
    str: _rgbaOrHexString(r, g, b, color.a, hex),
  };
}
