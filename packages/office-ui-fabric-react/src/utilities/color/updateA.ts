import { IColor } from './interfaces';
import { _rgbaOrHexString } from './_rgbaOrHexString';

/**
 * Gets a color with the given alpha value and the same other components as `color`.
 * Does not modify the original color.
 */
export function updateA(color: IColor, a: number): IColor {
  return {
    ...color,
    a: a,
    str: _rgbaOrHexString(color.r, color.g, color.b, a, color.hex)
  };
}
