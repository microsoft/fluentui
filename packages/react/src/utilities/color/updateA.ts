import { _rgbaOrHexString } from './_rgbaOrHexString';
import { MAX_COLOR_ALPHA } from './consts';
import type { IColor } from './interfaces';

/**
 * Gets a color with the given alpha value and the same other components as `color`.
 * Does not modify the original color.
 */
export function updateA(color: IColor, a: number): IColor {
  return {
    ...color,
    a,
    t: MAX_COLOR_ALPHA - a,
    str: _rgbaOrHexString(color.r, color.g, color.b, a, color.hex),
  };
}
