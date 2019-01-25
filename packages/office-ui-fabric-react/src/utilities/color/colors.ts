import { COLOR_VALUES } from './colorValues';

export const MAX_COLOR_SATURATION = 100;
export const MAX_COLOR_HUE = 359;
export const MAX_COLOR_VALUE = 100;
export const MAX_COLOR_RGB = 255;
/** @deprecated Use MAX_COLOR_RGB (255) or MAX_COLOR_ALPHA (100) */
export const MAX_COLOR_RGBA = MAX_COLOR_RGB;
export const MAX_COLOR_ALPHA = 100;

/** RGB color with optional alpha value. */
export interface IRGB {
  /** Red, range 0-255. */
  r: number;
  /** Green, range 0-255. */
  g: number;
  /** Blue, range 0-255. */
  b: number;
  /** Alpha, range 0 (transparent)-100. Usually assumed to be 100 if not specified. */
  a?: number;
}

export interface IHSV {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Value, range 0-100. */
  v: number;
}

export interface IHSL {
  /** Hue, range 0-359. */
  h: number;
  /** Saturation, range 0-100. */
  s: number;
  /** Lightness, range 0-100. */
  l: number;
}

export interface IColor extends IRGB, IHSV {
  /** Hex string for the color (excluding alpha component), *not* prefixed with #. */
  hex: string;

  /** CSS color string. If a hex value, it must be prefixed with #. */
  str: string;
}

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 */
export function cssColor(color: string): IRGB | undefined {
  if (!color) {
    return undefined;
  }
  return _named(color) || _hex3(color) || _hex6(color) || _rgba(color) || _hsla(color);
}

/** Converts RGB components to a hex color string (without # prefix). */
export function rgb2hex(r: number, g: number, b: number): string {
  return [_rgbToPaddedHex(r), _rgbToPaddedHex(g), _rgbToPaddedHex(b)].join('');
}

/** Converts HSV components to a hex color string (without # prefix). */
export function hsv2hex(h: number, s: number, v: number): string {
  const { r, g, b } = hsv2rgb(h, s, v);

  return rgb2hex(r, g, b);
}

/** Converts RGB components to an HSV color. */
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
  v = Math.round((max / MAX_COLOR_RGB) * 100);

  return { h, s, v };
}

/** Converts HSL components to an HSV color. */
export function hsl2hsv(h: number, s: number, l: number): IHSV {
  s *= (l < 50 ? l : 100 - l) / 100;
  const v = l + s;

  return {
    h: h,
    s: v === 0 ? 0 : ((2 * s) / v) * 100,
    v: v
  };
}

/** Converts HSV components to an HSL color. */
export function hsv2hsl(h: number, s: number, v: number): IHSL {
  s /= MAX_COLOR_SATURATION;
  v /= MAX_COLOR_VALUE;

  let l = (2 - s) * v;
  let sl = s * v;
  sl /= l <= 1 ? l : 2 - l;
  sl = sl || 0;
  l /= 2;

  return { h: h, s: sl * 100, l: l * 100 };
}

/** Converts HSL components to an RGB color. Does not set the alpha value. */
export function hsl2rgb(h: number, s: number, l: number): IRGB {
  const hsv = hsl2hsv(h, s, l);

  return hsv2rgb(hsv.h, hsv.s, hsv.v);
}

/** Converts HSV components to an RGB color. Does not set the alpha value. */
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
    r: Math.round(MAX_COLOR_RGB * (rgb[0] + m)),
    g: Math.round(MAX_COLOR_RGB * (rgb[1] + m)),
    b: Math.round(MAX_COLOR_RGB * (rgb[2] + m))
  };
}

/**
 * Converts a CSS color string to a color object.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 *
 * `inputColor` will be used unmodified as the `str` property of the returned object.
 * Alpha defaults to 100 if not specified in `inputColor`.
 * Returns undefined if the color string is invalid/not recognized.
 */
export function getColorFromString(inputColor: string): IColor | undefined {
  const color = cssColor(inputColor);

  if (!color) {
    return;
  }

  return {
    ...getColorFromRGBA(color!),
    str: inputColor
  };
}

/** Converts an RGBA color to a color object (alpha defaults to 100). */
export function getColorFromRGBA(rgba: IRGB): IColor {
  const { a = MAX_COLOR_ALPHA, b, g, r } = rgba;
  const { h, s, v } = rgb2hsv(r, g, b);
  const hex = rgb2hex(r, g, b);
  const str = _rgbaOrHexString(r, g, b, a, hex);

  return { a, b, g, h, hex, r, s, str, v };
}

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

  return { a, b, g, h, hex, r, s, str, v };
}

/**
 * Converts a color hue to an HTML color string (with # prefix).
 * This implementation ignores all components of `color` except hue.
 */
export function getFullColorString(color: IColor): string {
  return `#${hsv2hex(color.h, MAX_COLOR_SATURATION, MAX_COLOR_VALUE)}`;
}

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
    a: color.a,
    b: b,
    g: g,
    h: color.h,
    hex: hex,
    r: r,
    s: s,
    str: _rgbaOrHexString(r, g, b, color.a, hex),
    v: v
  };
}

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
    a: color.a,
    b: b,
    g: g,
    h: h,
    hex: hex,
    r: r,
    s: color.s,
    str: _rgbaOrHexString(r, g, b, color.a, hex),
    v: color.v
  };
}

/**
 * Gets a color with a single RGBA component updated to a new value.
 * Does not modify the original `color`. Alpha defaults to 100 if not set.
 */
export function updateRGB(color: IColor, component: keyof IRGB, value: number): IColor {
  return getColorFromRGBA({
    r: color.r,
    g: color.g,
    b: color.b,
    a: color.a,
    [component]: value
  });
}

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

/** Corrects an RGB color to fall within the valid range.  */
export function correctRGB(color: IRGB): IRGB {
  return {
    r: clamp(color.r, MAX_COLOR_RGB),
    g: clamp(color.g, MAX_COLOR_RGB),
    b: clamp(color.b, MAX_COLOR_RGB),
    a: typeof color.a === 'number' ? clamp(color.a, MAX_COLOR_ALPHA) : color.a
  };
}

/** Corrects an HSV color to fall within the valid range. */
export function correctHSV(color: IHSV): IHSV {
  return {
    h: clamp(color.h, MAX_COLOR_HUE),
    s: clamp(color.s, MAX_COLOR_SATURATION),
    v: clamp(color.v, MAX_COLOR_VALUE)
  };
}

/** Clamp a value to ensure it falls within a given range. */
export function clamp(value: number, max: number, min = 0): number {
  return value < min ? min : value > max ? max : value;
}

/** Converts an RGB component to a 0-padded hex component of length 2. */
function _rgbToPaddedHex(num: number): string {
  num = clamp(num, MAX_COLOR_RGB);
  const hex = num.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}

/**
 * If `str` is a valid HTML color name, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _named(str: string): IRGB | undefined {
  const c = (COLOR_VALUES as any)[str.toLowerCase()];

  if (c) {
    return {
      r: c[0],
      g: c[1],
      b: c[2],
      a: MAX_COLOR_ALPHA
    };
  }
}

/**
 * If `str` is in valid `rgb()` or `rgba()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
function _rgba(str: string): IRGB | undefined {
  const match = str.match(/^rgb(a?)\(([\d., ]+)\)$/);
  if (match) {
    const hasAlpha = !!match[1];
    const expectedPartCount = hasAlpha ? 4 : 3;
    const parts = match[2].split(/ *, */).map(Number);

    if (parts.length === expectedPartCount) {
      return {
        r: parts[0],
        g: parts[1],
        b: parts[2],
        a: hasAlpha ? parts[3] * 100 : MAX_COLOR_ALPHA
      };
    }
  }
}

/**
 * If `str` is in valid 6-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex6(str: string): IRGB | undefined {
  if ('#' === str[0] && 7 === str.length && /^#[\da-fA-F]{6}$/.test(str)) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: MAX_COLOR_ALPHA
    };
  }
}

/**
 * If `str` is in valid 3-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex3(str: string): IRGB | undefined {
  if ('#' === str[0] && 4 === str.length && /^#[\da-fA-F]{3}$/.test(str)) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: MAX_COLOR_ALPHA
    };
  }
}

/**
 * If `str` is in `hsl()` or `hsla()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
function _hsla(str: string): IRGB | undefined {
  const match = str.match(/^hsl(a?)\(([\d., ]+)\)$/);
  if (match) {
    const hasAlpha = !!match[1];
    const expectedPartCount = hasAlpha ? 4 : 3;
    const parts = match[2].split(/ *, */).map(Number);

    if (parts.length === expectedPartCount) {
      const rgba = hsl2rgb(parts[0], parts[1], parts[2]);
      rgba.a = hasAlpha ? parts[3] * 100 : MAX_COLOR_ALPHA;
      return rgba;
    }
  }
}

/**
 * Get a CSS color string from some color components.
 * If `a` is specified and not 100, returns an `rgba()` string.
 * Otherwise returns `hex` prefixed with #.
 */
function _rgbaOrHexString(r: number, g: number, b: number, a: number | undefined, hex: string): string {
  return a === MAX_COLOR_ALPHA || typeof a !== 'number' ? `#${hex}` : `rgba(${r}, ${g}, ${b}, ${a / MAX_COLOR_ALPHA})`;
}
