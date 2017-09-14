import {
  IColor,
  MAX_COLOR_RGBA
} from './Colors';
import * as Colors from './Colors';
import { assign } from '../../Utilities';

/* original constants for generating shades
const WhiteShadeTable = [0.95, 0.85, 0.75, 0.65, 0.50]; // white
const BlackTintTable = [0.50, 0.65, 0.75, 0.85, 0.95]; // black
const LumTintTable = [0.10, 0.25, 0.50, 0.75, 0.90]; // light shade (strongen all)
const LumShadeTable = [0.90, 0.75, 0.50, 0.25, 0.10]; // dark shade (soften all)
const ColorTintTable = [0.20, 0.40, 0.60]; // default soften
const ColorShadeTable = [0.75, 0.50]; // default strongen*/
const c_LuminanceLow = 0.2;
const c_LuminanceHigh = 0.8;

// Various constants used for generating shades of a color
// const WhiteShadeTable = [.973, .957, .918, .855, .816, .784, .651, .463]; // white
// const BlackTintTable = [.463, .651, .784, .816, .855, .918, .957, .973]; // black

// trying some new values for BG with design
const WhiteShadeTableBG = [.973, .957, .918, .855, .816, .784, .651, .463]; // white
const BlackTintTableBG = [.463, .55, .651, .784, .816, .855, .918, .957]; // black (same one as FG for now?)
const WhiteShadeTable = [.463, .651, .784, .816, .855, .918, .957, .973]; // white
const BlackTintTable = [.463, .55, .651, .784, .816, .855, .918, .957]; // black
// const LumTintTable = [.10, .20, .30, .43, .57, .70, .80, .90]; // light shade (strongen all)
// const LumShadeTable = [.90, .80, .70, .57, .43, .30, .20, .10]; // dark shade (soften all)
const LumTintTable = [.12, .23, .34, .45, .56, .67, .78, .89]; // light shade (strongen all)
const LumShadeTable = [.89, .78, .67, .56, .45, .34, .23, .12]; // dark shade (soften all)
const ColorTintTable = [.050, .100, .200, .42, .90]; // default soften
const ColorShadeTable = [.90, .70, .550]; // default strongen

/** Shades of a given color, from Lightest to Darkest. */
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
export function isValidShade(shade: Shade): boolean {
  'use strict';
  return (typeof shade === 'number') && (shade >= Shade.Unshaded) && (shade <= Shade.Shade8);
}

function _isBlack(color: IColor): boolean {
  return color.r === 0 && color.g === 0 && color.b === 0;
}

function _isWhite(color: IColor): boolean {
  return color.r === MAX_COLOR_RGBA && color.g === MAX_COLOR_RGBA && color.b === MAX_COLOR_RGBA;
}

function _darken(hsl: { h: number, s: number, l: number }, factor) {
  return {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l * factor
  };
}

function _lighten(hsl: { h: number, s: number, l: number }, factor) {
  return {
    h: hsl.h,
    s: hsl.s,
    l: hsl.l * factor + (100 * (1 - factor))
  };
}

function _initializeIsDark() {
  const bgColor: IColor = window['__backgroundColor'];
  if (bgColor) {
    window['__isDarkTheme'] = Colors.hsv2hsl(bgColor.h, bgColor.s, bgColor.v).l < 50;
    window['__backgroundColor'] = void 0;
    console.log('isDarkTheme: ' + Colors.hsv2hsl(bgColor.h, bgColor.s, bgColor.v).l);
  }
  return window['__isDarkTheme'] || false;
}

/* Original getShade() logic:
  let hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let tableIndex = shade - 1;
  if (_isWhite(color)) { // white
    hsl = _darken(hsl, WhiteShadeTable[tableIndex]);
  } else if (_isBlack(color)) { // black
    hsl = _lighten(hsl, BlackTintTable[tableIndex]);
  } else if (hsl.l / 100 > c_LuminanceHigh) { // light
    hsl = _darken(hsl, LumShadeTable[tableIndex]);
  } else if (hsl.l / 100 < c_LuminanceLow) { // dark
    hsl = _lighten(hsl, LumTintTable[tableIndex]);
  } else { // default
    if (tableIndex < ColorTintTable.length) {
      hsl = _lighten(hsl, ColorTintTable[tableIndex]);
    } else {
      hsl = _darken(hsl, ColorShadeTable[tableIndex - ColorTintTable.length]);
    }
  }
*/

/** todo: update
 * Given a color and a shade specification, generates the requested shade of the color.
 * Logic: (todo formatting)
 * if white
 *  darken: [0.95, 0.85, 0.75, 0.65, 0.50]
 * if black
 *  lighten:[0.50, 0.65, 0.75, 0.85, 0.95]
 * if dark
 *  lighten:[0.10, 0.25, 0.50, 0.75, 0.90]
 * if bright
 *  darken: [0.90, 0.75, 0.50, 0.25, 0.10]
 * default
 *  lghtst lghtr med   drkr  drkst
 *  [0.20, 0.40, 0.60][0.75, 0.50]
 * @param {RgbaColor} color The base color whose Shade are to be computed
 * @param {Shade} shade The shade of the base color to compute.
 */
export function getShade(color: IColor, shade: Shade) {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  const isDarkTheme = _initializeIsDark();

  let hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let tableIndex = shade - 1;
  let _soften = _lighten;
  let _strongen = _darken;
  if (isDarkTheme) {
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
export function getBackgroundShade(color: IColor, shade: Shade) {
  'use strict';
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  _initializeIsDark();

  let hsl = Colors.hsv2hsl(color.h, color.s, color.v);
  let tableIndex = shade - 1;
  /*if (hsl.l / 100 > c_LuminanceHigh) { // really light
    hsl = _darken(hsl, WhiteShadeTable[tableIndex]);
  } else if (hsl.l / 100 < c_LuminanceLow) { // really dark
    hsl = _lighten(hsl, BlackTintTable[BlackTintTable.length - 1 - tableIndex]);
  } else*/ if (hsl.l / 100 >= .5) { // lightish
    // hsl = _darken(hsl, LumShadeTable[tableIndex]);
    hsl = _darken(hsl, WhiteShadeTableBG[tableIndex]);
  } else { // default: if (hsl.l / 100 < .5) { // darkish
    // hsl = _lighten(hsl, LumTintTable[LumTintTable.length - 1 - tableIndex]);
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