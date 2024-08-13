import { getDocument } from '@fluentui/utilities';
import { MAX_COLOR_ALPHA } from './consts';
import { hsl2rgb } from './hsl2rgb';
import type { IRGB } from './interfaces';

/**
 * Converts a valid CSS color string to an RGB color.
 * Note that hex colors *must* be prefixed with # to be considered valid.
 * Alpha in returned color defaults to 100.
 * Four and eight digit hex values (with alpha) are supported if the current browser supports them.
 */
export function cssColor(color?: string, doc?: Document): IRGB | undefined {
  if (!color) {
    return undefined;
  }

  const theDoc = doc ?? getDocument()!;

  // Need to check the following valid color formats: RGB(A), HSL(A), hex, named color

  // First check for well formatted RGB(A), HSL(A), and hex formats at the start.
  // This is for perf (no creating an element) and catches the intentional "transparent" color
  //   case early on.
  const easyColor: IRGB | undefined = _rgba(color) || _hex6(color) || _hex3(color) || _hsla(color);
  if (easyColor) {
    return easyColor;
  }

  // if the above fails, do the more expensive catch-all
  return _browserCompute(color, theDoc);
}

/**
 * Uses the browser's getComputedStyle() to determine what the passed-in color is.
 * This assumes _rgba, _hex6, _hex3, and _hsla have already been tried and all failed.
 * This works by attaching an element to the DOM, which may fail in server-side rendering
 *   or with headless browsers.
 */
function _browserCompute(str: string, doc: Document): IRGB | undefined {
  if (typeof doc === 'undefined') {
    // don't throw an error when used server-side
    return undefined;
  }
  const elem = doc.createElement('div');
  elem.style.backgroundColor = str;
  // This element must be attached to the DOM for getComputedStyle() to have a value
  elem.style.position = 'absolute';
  elem.style.top = '-9999px';
  elem.style.left = '-9999px';
  elem.style.height = '1px';
  elem.style.width = '1px';
  doc.body.appendChild(elem);
  const eComputedStyle = doc.defaultView?.getComputedStyle(elem);
  const computedColor = eComputedStyle && eComputedStyle.backgroundColor;
  doc.body.removeChild(elem);
  // computedColor is always an RGB(A) string, except for invalid colors in IE/Edge which return 'transparent'

  // browsers return one of these if the color string is invalid,
  // so need to differentiate between an actual error and intentionally passing in this color
  if (computedColor === 'rgba(0, 0, 0, 0)' || computedColor === 'transparent') {
    switch (str.trim()) {
      // RGB and HSL were already checked at the start of the function
      case 'transparent':
      case '#0000':
      case '#00000000':
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
        a: hasAlpha ? parts[3] * 100 : MAX_COLOR_ALPHA,
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

/**
 * If `str` is in valid 6-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex6(str: string): IRGB | undefined {
  if (str[0] === '#' && str.length === 7 && /^#[\da-fA-F]{6}$/.test(str)) {
    return {
      r: parseInt(str.slice(1, 3), 16),
      g: parseInt(str.slice(3, 5), 16),
      b: parseInt(str.slice(5, 7), 16),
      a: MAX_COLOR_ALPHA,
    };
  }
}

/**
 * If `str` is in valid 3-digit hex format *with* # prefix, returns an RGB color (with alpha 100).
 * Otherwise returns undefined.
 */
function _hex3(str: string): IRGB | undefined {
  if (str[0] === '#' && str.length === 4 && /^#[\da-fA-F]{3}$/.test(str)) {
    return {
      r: parseInt(str[1] + str[1], 16),
      g: parseInt(str[2] + str[2], 16),
      b: parseInt(str[3] + str[3], 16),
      a: MAX_COLOR_ALPHA,
    };
  }
}
