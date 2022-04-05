import { MAX_COLOR_RGB } from './consts';
import { clamp } from './clamp';

/** Converts RGB components to a hex color string (without # prefix). */
export function rgb2hex(r: number, g: number, b: number): string {
  return [_rgbToPaddedHex(r), _rgbToPaddedHex(g), _rgbToPaddedHex(b)].join('');
}

/** Converts an RGB component to a 0-padded hex component of length 2. */
function _rgbToPaddedHex(num: number): string {
  num = clamp(num, MAX_COLOR_RGB);
  const hex = num.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}
