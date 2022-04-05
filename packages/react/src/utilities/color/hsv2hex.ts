import { hsv2rgb } from './hsv2rgb';
import { rgb2hex } from './rgb2hex';

/** Converts HSV components to a hex color string (without # prefix). */
export function hsv2hex(h: number, s: number, v: number): string {
  const { r, g, b } = hsv2rgb(h, s, v);

  return rgb2hex(r, g, b);
}
