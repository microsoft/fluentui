import { IRGB } from './interfaces';
import { MAX_COLOR_ALPHA } from './consts';
import { hsl2rgb } from './hsl2rgb';

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
export function cssColor(color: string): IRGB | undefined {
  // Need to check the following valid color formats: RGB(A), HSL(A), hex, named color

  // First check for RGB(A) and HSL(A) formats
  const rgbaColor = _rgba(color);
  if (rgbaColor) {
    return rgbaColor;
  }
  const hslaColor = _hsla(color);
  if (hslaColor) {
    return hslaColor;
  }

  // Otherwise, do a catch-all for hex and named colors
  // This element must be attached to the DOM for getComputedStyle() to have a value
  const elem = document.createElement('div');
  elem.style.backgroundColor = color;
  elem.style.position = 'absolute';
  elem.style.top = '-9999px';
  elem.style.left = '-9999px';
  elem.style.height = '1px';
  elem.style.width = '1px';
  document.body.appendChild(elem);
  const eComputedStyle = getComputedStyle(elem);
  const computedColor = eComputedStyle && eComputedStyle.backgroundColor;
  // console.error('input: ' + color + '\ncomputed color: ' + eComputedStyle.backgroundColor);
  document.body.removeChild(elem);
  // computedColor is always an RGB string, except for invalid colors in IE/Edge which return 'transparent'

  // browsers return one of these if the color string is invalid,
  // so need to differentiate between an actual error and intentionally passing in this color
  if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
    switch (color.trim()) {
      case 'transparent':
      case '#0000':
      case '#00000000':
        // RGB and HSL were already checked at the start of the function
        return { r: 0, g: 0, b: 0, a: 0 };
    }
    return undefined;
  }

  return _rgba(computedColor);
}

/**
 * If `str` is in valid `rgb()` or `rgba()` format, returns an RGB color (alpha defaults to 100).
 * Otherwise returns undefined.
 */
function _rgba(str?: string | null): IRGB | undefined {
  if (!str) {
    return undefined;
  }

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
