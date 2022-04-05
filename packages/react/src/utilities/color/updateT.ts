import { _rgbaOrHexString } from './_rgbaOrHexString';
import { MAX_COLOR_ALPHA } from './consts';
import type { IColor } from './interfaces';

/**
 * Gets a color with the given transparency value and the same other components as `color`.
 * Does not modify the original color.
 */
export function updateT(color: IColor, t: number): IColor {
  const a = MAX_COLOR_ALPHA - t;
  return {
    ...color,
    t,
    a,
    str: _rgbaOrHexString(color.r, color.g, color.b, a, color.hex),
  };
}
