import { IRGB } from './color.types';
import { hsl2rgb } from './color.hsl';

/**
 * Attempt to parse a color into an rgb value
 *
 * @param color - a string value for a color, as would be provided to css.  This might be a name, a hex
 * value, an rgba value, and so on.
 */
export function cssColor(color: string): IRGB | undefined {
  return (
    _named(color) ||
    _hex3(color) ||
    _hex6(color) ||
    _rgb(color) ||
    _rgba(color) ||
    _hsl(color) ||
    (_hsla(color) as IRGB)
  );
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

  return hex.length === 1 ? `0${hex}` : hex;
}

function _named(str: string): IRGB | undefined {
  const { COLOR_VALUES } = require('./colorValues');
  const c = (COLOR_VALUES as any)[str.toLowerCase()];

  if (c) {
    return {
      r: c[0],
      g: c[1],
      b: c[2],
      a: 100,
    };
  }
}

function _rgb(str: string): IRGB | undefined {
  if (str.indexOf('rgb(') === 0) {
    str = str.match(/rgb\(([^)]+)\)/)![1];

    const parts = str.split(/ *, */).map(Number);

    return {
      r: parts[0],
      g: parts[1],
      b: parts[2],
      a: 100,
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
      a: parts[3] * 100,
    };
  }
}

function _hex6(str: string): IRGB | undefined {
  if (str[0] === '#' && str.length === 7) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: 100,
    };
  }
}

function _hex3(str: string): IRGB | undefined {
  if (str[0] === '#' && str.length === 4) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: 100,
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

    const rgba = hsl2rgb({ h, s, l });
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
    const rgba = hsl2rgb({ h, s, l });

    rgba.a = a;

    return rgba;
  }
}
