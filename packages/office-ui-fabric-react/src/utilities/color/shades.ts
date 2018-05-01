// Technically this should be shades and tints, but for simplicity we'll call everything a shade.
/* This utility module is used with theming. Given a color to shade, whether the theme is inverted (i.e. is a dark color),
 * and the desired shade enum, this will return an appropriate shade of that color.
 */
import {
  IHSV,
  IColor,
  MAX_COLOR_RGBA
} from './colors';
import * as Colors from './colors';
import { assign } from '../../Utilities';

// Soften: to get closer to the background color's luminance (softening with a white background would be lightening, with black it'd be darkening)
// Strongen: opposite of soften

// Luminance multiplier constants for generating shades of a given color
const WhiteShadeTableBG = [.027, .043, .082, .145, .184, .216, .349, .537]; // white bg
const BlackTintTableBG = [.537, .45, .349, .216, .184, .145, .082, .043]; // black bg
const WhiteShadeTable = [.537, .349, .216, .184, .145, .082, .043, .027]; // white fg
const BlackTintTable = [.537, .45, .349, .216, .184, .145, .082, .043]; // black fg
const LumTintTable = [.88, .77, .66, .55, .44, .33, .22, .11]; // light (strongen all)
const LumShadeTable = [.11, .22, .33, .44, .55, .66, .77, .88]; // dark (soften all)
const ColorTintTable = [.960, .840, .700, .400, .120]; // default soften
const ColorShadeTable = [.100, .240, .440]; // default strongen

// If the given shade's luminance is below/above these values, we'll swap to using the White/Black tables above
const LowLuminanceThreshold = 0.2;
const HighLuminanceThreshold = 0.8;

/** Shades of a given color, from softest to strongest. */
export enum Shade {
  Unshaded = 0,
  Shade1 = 1,
  Shade2 = 2,
  Shade3 = 3,
  Shade4 = 4,
  Shade5 = 5,
  Shade6 = 6,
  Shade7 = 7,
  Shade8 = 8,
  // remember to update isValidShade()!
}

/**
 * Returns true if the argument is a valid Shade value
 * @param {Shade} shade The Shade value to validate.
 */
export function isValidShade(shade?: Shade): boolean {
  'use strict';
  return (typeof shade === 'number') && (shade >= Shade.Unshaded) && (shade <= Shade.Shade8);
}

function _isBlack(color: IColor): boolean {
  return color.r === 0 && color.g === 0 && color.b === 0;
}

function _isWhite(color: IColor): boolean {
  return color.r === MAX_COLOR_RGBA && color.g === MAX_COLOR_RGBA && color.b === MAX_COLOR_RGBA;
}

function _darken(hsv: IHSV, factor: number): IHSV {
  return {
    h: hsv.h,
    s: hsv.s,
    v: _clamp(hsv.v - (hsv.v * factor), 0, 100)
  };
}

function _lighten(hsv: IHSV, factor: number): IHSV {
  return {
    h: hsv.h,
    s: _clamp(hsv.s - (hsv.s * factor), 0, 100),
    v: _clamp(hsv.v + ((100 - hsv.v) * factor), 0, 100)
  };
}

function _clamp(n: number, min: number, max: number) {
  return n; // Math.max(min, Math.min(n, max));
}

export function isDark(color: IColor): boolean {
  return Colors.hsv2hsl(color.h, color.s, color.v).l < 50;
}

/**
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic:
 * if white
 *  darken via tables defined above
 * if black
 *  lighten
 * if light
 *  strongen
 * if dark
 *  soften
 * else default
 *  soften or strongen depending on shade#
 * @param {IColor} color The base color whose shade is to be computed
 * @param {Shade} shade The shade of the base color to compute
 * @param {Boolean} isInverted Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
export function getShade(color: IColor, shade: Shade, isInverted: boolean = false): IColor | null {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  const hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let hsv = { h: color.h, s: color.s, v: color.v };
  const tableIndex = shade - 1;
  let _soften = _lighten;
  let _strongen = _darken;
  if (isInverted) {
    _soften = _darken;
    _strongen = _lighten;
  }
  if (_isWhite(color)) { // white
    hsv = _darken(hsv, WhiteShadeTable[tableIndex]);
  } else if (_isBlack(color)) { // black
    hsv = _lighten(hsv, BlackTintTable[tableIndex]);
  } else if (hsl.l / 100 > HighLuminanceThreshold) { // light
    hsv = _strongen(hsv, LumShadeTable[tableIndex]);
  } else if (hsl.l / 100 < LowLuminanceThreshold) { // dark
    hsv = _soften(hsv, LumTintTable[tableIndex]);
  } else { // default
    if (tableIndex < ColorTintTable.length) {
      hsv = _soften(hsv, ColorTintTable[tableIndex]);
    } else {
      hsv = _strongen(hsv, ColorShadeTable[tableIndex - ColorTintTable.length]);
    }
  }

  return Colors.getColorFromRGBA(assign(Colors.hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
}

// Background shades/tints are generated differently. The provided color will be guaranteed
//   to be the darkest or lightest one. If it is <50% luminance, it will always be the darkest,
//   otherwise it will always be the lightest.
export function getBackgroundShade(color: IColor, shade: Shade, isInverted: boolean = false): IColor | null {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  let hsv = { h: color.h, s: color.s, v: color.v };
  const tableIndex = shade - 1;
  if (!isInverted) { // lightish
    hsv = _darken(hsv, WhiteShadeTableBG[tableIndex]);
  } else { // default: if (hsl.l / 100 < .5) { // darkish
    hsv = _lighten(hsv, BlackTintTableBG[BlackTintTable.length - 1 - tableIndex]);
  }

  return Colors.getColorFromRGBA(assign(Colors.hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
}

/* Calculates the contrast ratio between two colors. Used for verifying
 * color pairs meet minimum accessibility requirements.
 * See: https://www.w3.org/TR/WCAG20/ section 1.4.3
 */
export function getContrastRatio(color1: IColor, color2: IColor): number {
  // Formula defined by: http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
  // relative luminance: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

  /* calculate the intermediate value needed to calculating relative luminance */
  function _getThing(x: number): number {
    if (x <= .03928) {
      return x / 12.92;
    } else {
      return Math.pow((x + .055) / 1.055, 2.4);
    }
  }

  const r1 = _getThing(color1.r / MAX_COLOR_RGBA);
  const g1 = _getThing(color1.g / MAX_COLOR_RGBA);
  const b1 = _getThing(color1.b / MAX_COLOR_RGBA);
  let L1 = (.2126 * r1) + (.7152 * g1) + (.0722 * b1); // relative luminance of first color
  L1 += .05;

  const r2 = _getThing(color2.r / MAX_COLOR_RGBA);
  const g2 = _getThing(color2.g / MAX_COLOR_RGBA);
  const b2 = _getThing(color2.b / MAX_COLOR_RGBA);
  let L2 = (.2126 * r2) + (.7152 * g2) + (.0722 * b2); // relative luminance of second color
  L2 += .05;

  // return the lighter color divided by darker
  return L1 / L2 > 1 ?
    L1 / L2 : L2 / L1;
}
