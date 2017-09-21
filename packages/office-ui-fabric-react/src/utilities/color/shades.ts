// Technically this should be shades and tints, but for simplicity we'll call everything a shade.
/* This utility module is used with theming. Given a color to shade, whether the theme is inverted (i.e. is a dark color),
 * and the desired shade enum, this will return an appropriate shade of that color.
 */
import {
  IColor,
  MAX_COLOR_RGBA
} from './colors';
import * as Colors from './colors';
import { assign } from '../../Utilities';

// Soften: to get closer to the background color's luminance (softening with a white background would be lightening, with black it'd be darkening)
// Strongen: opposite of soften

// Luminance multiplier constants for generating shades of a given color
const WhiteShadeTableBG = [.973, .957, .918, .855, .816, .784, .651, .463]; // white bg
const BlackTintTableBG = [.463, .55, .651, .784, .816, .855, .918, .957]; // black bg
const WhiteShadeTable = [.463, .651, .784, .816, .855, .918, .957, .973]; // white fg
const BlackTintTable = [.463, .55, .651, .784, .816, .855, .918, .957]; // black fg
const LumTintTable = [.12, .23, .34, .45, .56, .67, .78, .89]; // light (strongen all)
const LumShadeTable = [.89, .78, .67, .56, .45, .34, .23, .12]; // dark (soften all)
const ColorTintTable = [.050, .100, .200, .42, .90]; // default soften
const ColorShadeTable = [.90, .70, .550]; // default strongen

// If the given shade's luminance is below/above these values, we'll swap to using the White/Black tables above
const c_LuminanceLow = 0.2;
const c_LuminanceHigh = 0.8;

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

function _darken(hsl: { h: number, s: number, l: number }, factor: number) {
  return {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l * factor
  };
}

function _lighten(hsl: { h: number, s: number, l: number }, factor: number) {
  return {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l * factor + (100 * (1 - factor))
  };
}

export function isDark(color: IColor) {
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
export function getShade(color: IColor, shade: Shade, isInverted = false) {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  let hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let tableIndex = shade - 1;
  let _soften = _lighten;
  let _strongen = _darken;
  if (isInverted) {
    // tableIndex = LumTintTable.length - 1 - tableIndex;
    _soften = _darken;
    _strongen = _lighten;
  }
  if (_isWhite(color)) { // white
    hsl = _darken(hsl, WhiteShadeTable[tableIndex]);
  } else if (_isBlack(color)) { // black
    hsl = _lighten(hsl, BlackTintTable[tableIndex]);
  } else if (hsl.l / 100 > c_LuminanceHigh) { // light
    hsl = _strongen(hsl, LumShadeTable[tableIndex]);
  } else if (hsl.l / 100 < c_LuminanceLow) { // dark
    hsl = _soften(hsl, LumTintTable[tableIndex]);
  } else { // default
    if (tableIndex < ColorTintTable.length) {
      hsl = _soften(hsl, ColorTintTable[tableIndex]);
    } else {
      hsl = _strongen(hsl, ColorShadeTable[tableIndex - ColorTintTable.length]);
    }
  }

  return Colors.getColorFromRGBA(assign(Colors.hsl2rgb(hsl.h, hsl.s, hsl.l), { a: color.a }));
}

// Background shades/tints are generated differently. The provided color will be guaranteed
//   to be the darkest or lightest one. If it is <50% luminance, it will always be the darkest,
//   otherwise it will always be the lightest.
export function getBackgroundShade(color: IColor, shade: Shade, isInverted = false) {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  let hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let tableIndex = shade - 1;
  if (!isInverted) { // lightish
    hsl = _darken(hsl, WhiteShadeTableBG[tableIndex]);
  } else { // default: if (hsl.l / 100 < .5) { // darkish
    hsl = _lighten(hsl, BlackTintTableBG[BlackTintTable.length - 1 - tableIndex]);
  }

  return Colors.getColorFromRGBA(assign(Colors.hsl2rgb(hsl.h, hsl.s, hsl.l), { a: color.a }));
}

/* Calculates the contrast ratio between two colors. Used for verifying
 * color pairs meet minimum accessibility requirements.
 * See: https://www.w3.org/TR/WCAG20/ section 1.4.3
 */
export function getContrastRatio(color1: IColor, color2: IColor) {
  // Formula defined by: http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
  // relative luminance: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

  /* calculate the intermediate value needed to calculating relative luminance */
  function _getThing(x: number) {
    if (x <= .03928) {
      return x / 12.92;
    } else {
      return Math.pow((x + .055) / 1.055, 2.4);
    }
  }

  let r1 = _getThing(color1.r / MAX_COLOR_RGBA);
  let g1 = _getThing(color1.g / MAX_COLOR_RGBA);
  let b1 = _getThing(color1.b / MAX_COLOR_RGBA);
  let L1 = (.2126 * r1) + (.7152 * g1) + (.0722 * b1); // relative luminance of first color
  L1 += .05;

  let r2 = _getThing(color2.r / MAX_COLOR_RGBA);
  let g2 = _getThing(color2.g / MAX_COLOR_RGBA);
  let b2 = _getThing(color2.b / MAX_COLOR_RGBA);
  let L2 = (.2126 * r2) + (.7152 * g2) + (.0722 * b2); // relative luminance of second color
  L2 += .05;

  // return the lighter color divided by darker
  return L1 / L2 > 1 ?
    L1 / L2 : L2 / L1;
}