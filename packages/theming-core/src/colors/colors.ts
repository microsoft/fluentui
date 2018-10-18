import { COLOR_VALUES } from './colorValues';

/**
 * An rgb value, generally values range from 0 to 255
 */
export interface IRGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface IHSL {
  /** hue, a value from 0 to 360 representing position on a color wheel */
  h: number;

  /** saturation value, ranges from 0 to 1 */
  s: number;

  /** lightness value, ranges from 0 to 1 */
  l: number;
}

/**
 * Attempt to parse a color into an rgb value
 *
 * @param color - a string value for a color, as would be provided to css.  This might be a name, a hex
 * value, an rgba value, and so on.
 */
export function cssColor(color: string): IRGB | undefined {
  return _named(color) || _hex3(color) || _hex6(color) || _rgb(color) || _rgba(color) || _hsl(color) || (_hsla(color) as IRGB);
}

/**
 * Take an rgb numbers and turn them into hex values such as 'ffab04'
 *
 * @param r - red value
 * @param g - green value
 * @param b - blue value
 */
export function rgb2hex(r: number, g: number, b: number): string {
  return [_numberToPaddedHex(r), _numberToPaddedHex(g), _numberToPaddedHex(b)].join('');
}

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

  return { h: h, s: s, l: l };
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

  let r1,
    g1,
    b1: number = 0;

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
    b: Math.round(255 * (b1 + m))
  };
}

/**
 * Turn an rgb value into a string color value.  Either as an rgba if it has an alpha, or as a hex based
 * string
 *
 * @param r - red
 * @param g - green
 * @param b - blue
 * @param a - alpha, defaulted to 100 which is opaque
 */
export function rgbToString(r: number, g: number, b: number, a: number = 100): string {
  if (a !== 100) {
    return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
  }
  return `#${rgb2hex(r, g, b)}`;
}

function _numberToPaddedHex(num: number): string {
  const hex = num.toString(16);

  return hex.length === 1 ? '0' + hex : hex;
}

function _named(str: string): IRGB | undefined {
  // TODO: fix type and remove tslint rule?
  const c = (COLOR_VALUES as any)[str.toLowerCase()];

  if (c) {
    return {
      r: c[0],
      g: c[1],
      b: c[2],
      a: 100
    };
  }
}

function _rgb(str: string): IRGB | undefined {
  if (0 === str.indexOf('rgb(')) {
    str = str.match(/rgb\(([^)]+)\)/)![1];

    const parts = str.split(/ *, */).map(Number);

    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: 100
    };
  }
}

function _rgba(str: string): IRGB | undefined {
  if (str.indexOf('rgba(') === 0) {
    str = str.match(/rgba\(([^)]+)\)/)![1];

    const parts = str.split(/ *, */).map(Number);

    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: parts[3] * 100
    };
  }
}

function _hex6(str: string): IRGB | undefined {
  if ('#' === str[0] && 7 === str.length) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: 100
    };
  }
}

function _hex3(str: string): IRGB | undefined {
  if ('#' === str[0] && 4 === str.length) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: 100
    };
  }
}

function _hsl(str: string): IRGB | undefined {
  if (str.indexOf('hsl(') === 0) {
    str = str.match(/hsl\(([^)]+)\)/)![1];
    const parts = str.split(/ *, */);

    const h = parseInt(parts[0], 10);
    const s = parseInt(parts[1], 10) / 100;
    const l = parseInt(parts[2], 10) / 100;

    const rgba = hsl2rgb({ h: h, s: s, l: l });
    rgba.a = 100;

    return rgba;
  }
}

function _hsla(str: string): IRGB | undefined {
  if (str.indexOf('hsla(') === 0) {
    str = str.match(/hsla\(([^)]+)\)/)![1];

    const parts = str.split(/ *, */);
    const h = parseInt(parts[0], 10);
    const s = parseInt(parts[1], 10) / 100;
    const l = parseInt(parts[2], 10) / 100;
    const a = parseInt(parts[3], 10) * 100;
    const rgba = hsl2rgb({ h: h, s: s, l: l });

    rgba.a = a;

    return rgba;
  }
}
