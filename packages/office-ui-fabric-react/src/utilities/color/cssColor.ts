import { IRGB } from './interfaces';
import { MAX_COLOR_ALPHA } from './consts';
import { COLOR_VALUES } from './colorValues';
import { hsl2rgb } from './hsl2rgb';

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
