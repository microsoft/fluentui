import { assign } from '@uifabric/utilities';
import { rgb2hex, IRGB, cssColor } from '@uifabric/theming-core';

export { IRGB, IHSL, cssColor, rgb2hex } from '@uifabric/theming-core';

export const MAX_COLOR_SATURATION = 100;
export const MAX_COLOR_HUE = 359;
export const MAX_COLOR_VALUE = 100;
export const MAX_COLOR_RGBA = 255;

export interface IHSV {
  h: number;
  s: number;
  v: number;
}

export interface IColor extends IRGB, IHSV {
  hex: string;
  str: string;
}

export function hsv2hex(h: number, s: number, v: number): string {
  const { r, g, b } = hsv2rgb(h, s, v);

  return rgb2hex(r, g, b);
}

export function rgb2hsv(r: number, g: number, b: number): IHSV {
  let h = NaN;
  let s;
  let v;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  // hue
  if (delta === 0) {
    h = 0;
  } else if (r === max) {
    h = ((g - b) / delta) % 6;
  } else if (g === max) {
    h = (b - r) / delta + 2;
  } else if (b === max) {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  // saturation
  s = Math.round((max === 0 ? 0 : delta / max) * 100);

  // value
  v = Math.round((max / 255) * 100);

  return { h, s, v };
}

export function hsl2hsv(h: number, s: number, l: number): IHSV {
  s *= (l < 50 ? l : 100 - l) / 100;

  return {
    h: h,
    s: ((2 * s) / (l + s)) * 100,
    v: l + s
  };
}

export function hsv2hsl(h: number, s: number, v: number): { h: number; s: number; l: number } {
  s /= MAX_COLOR_SATURATION;
  v /= MAX_COLOR_VALUE;

  let l = (2 - s) * v;
  let sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return { h: h, s: sl * 100, l: l * 100 };
}

export function hsv2rgb(h: number, s: number, v: number): IRGB {
  s = s / 100;
  v = v / 100;

  let rgb: number[] = [];

  const c = v * s;
  const hh = h / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  const m = v - c;

  switch (Math.floor(hh)) {
    case 0:
      rgb = [c, x, 0];
      break;

    case 1:
      rgb = [x, c, 0];
      break;

    case 2:
      rgb = [0, c, x];
      break;

    case 3:
      rgb = [0, x, c];
      break;

    case 4:
      rgb = [x, 0, c];
      break;

    case 5:
      rgb = [c, 0, x];
      break;
  }

  return {
    r: Math.round(MAX_COLOR_RGBA * (rgb[0] + m)),
    g: Math.round(MAX_COLOR_RGBA * (rgb[1] + m)),
    b: Math.round(MAX_COLOR_RGBA * (rgb[2] + m))
  };
}

export function getColorFromString(inputColor: string): IColor | undefined {
  const color = cssColor(inputColor);

  if (!color) {
    return;
  }

  const { a, b, g, r } = color;
  const { h, s, v } = rgb2hsv(r, g, b);

  return {
    a: a,
    b: b,
    g: g,
    h: h,
    hex: rgb2hex(r, g, b),
    r: r,
    s: s,
    str: inputColor,
    v: v
  };
}

export function getColorFromRGBA(rgba: { r: number; g: number; b: number; a: number }): IColor {
  const { a, b, g, r } = rgba;
  const { h, s, v } = rgb2hsv(r, g, b);

  const hex = rgb2hex(r, g, b);
  return {
    a: a,
    b: b,
    g: g,
    h: h,
    hex: hex,
    r: r,
    s: s,
    str: a === 100 ? `#${hex}` : `rgba(${r}, ${g}, ${b}, ${a / 100})`,
    v: v
  };
}

export function updateSV(color: IColor, s: number, v: number): IColor {
  const { r, g, b } = hsv2rgb(color.h, s, v);
  const hex = rgb2hex(r, g, b);

  return {
    a: color.a,
    b: b,
    g: g,
    h: color.h,
    hex: hex,
    r: r,
    s: s,
    str: color.a === 100 ? `#${hex}` : `rgba(${r}, ${g}, ${b}, ${(color.a as number) / 100})`,
    v: v
  };
}

export function updateH(color: IColor, h: number): IColor {
  const { r, g, b } = hsv2rgb(h, color.s, color.v);
  const hex = rgb2hex(r, g, b);

  return {
    a: color.a,
    b: b,
    g: g,
    h: h,
    hex: hex,
    r: r,
    s: color.s,
    str: color.a === 100 ? `#${hex}` : `rgba(${r}, ${g}, ${b}, ${(color.a as number) / 100})`,
    v: color.v
  };
}

export function updateA(color: IColor, a: number): IColor {
  return assign({}, color, {
    a: a,
    str: a === 100 ? `#${color.hex}` : `rgba(${color.r}, ${color.g}, ${color.b}, ${a / 100})`
  });
}

export function getFullColorString(color: IColor): string {
  return `#${hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE)}`;
}
