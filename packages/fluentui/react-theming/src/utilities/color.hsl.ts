import { IRGB, IHSL } from './color.types';

/**
 * Converts an rgb value directly into an hsl
 *
 * @param rgb - rgb value to convert to hsl.  Note that s/l have ranges from 0 to 1
 */
export function rgb2hsl(rgb: IRGB): IHSL {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // Calculate hue
  let h: number = 0;
  if (delta === 0) {
    h = 0;
  } else if (r === max) {
    h = ((g - b) / delta) % 6;
  } else if (g === max) {
    h = (b - r) / delta + 2;
  } else if (b === max) {
    h = (r - g) / delta + 4;
  }

  h *= 60;

  // hue is a wheel -- adjust for negatives
  if (h < 0) {
    h += 360;
  }

  // Calculate lightness
  const l: number = (max + min) / 2;

  // Calculate saturation
  let s: number = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
  }

  return { h, s, l };
}

/**
 * Given an IHSl will generate an IRGB with filled in r g and b
 *
 * @param hsl - hsl an IHSL with s and l being values from 0 to 1
 */
export function hsl2rgb(hsl: IHSL): IRGB {
  const c: number = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;
  const x: number = c * (1 - Math.abs(((hsl.h / 60) % 2) - 1));
  const m: number = hsl.l - c / 2;

  let r1: number = 0;
  let g1: number = 0;
  let b1: number = 0;

  // different values of h
  if (hsl.h < 60) {
    r1 = c;
    g1 = x;
    b1 = 0;
  } else if (hsl.h < 120) {
    r1 = x;
    g1 = c;
    b1 = 0;
  } else if (hsl.h < 180) {
    r1 = 0;
    g1 = c;
    b1 = x;
  } else if (hsl.h < 240) {
    r1 = 0;
    g1 = x;
    b1 = c;
  } else if (hsl.h < 300) {
    r1 = x;
    g1 = 0;
    b1 = c;
  } else {
    r1 = c;
    g1 = 0;
    b1 = x;
  }

  return {
    r: Math.round(255 * (r1 + m)),
    g: Math.round(255 * (g1 + m)),
    b: Math.round(255 * (b1 + m)),
  };
}
