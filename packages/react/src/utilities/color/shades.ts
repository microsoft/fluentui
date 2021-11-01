// Technically this should be shades and tints, but for simplicity we'll call everything a shade.
/*
 * This utility module is used with theming. Given a color to shade, whether the theme is inverted
 * (i.e. is a dark color), and the desired shade enum, this will return an appropriate shade of that color.
 */
import { MAX_COLOR_RGB } from './consts';
import { assign } from '../../Utilities';
import { clamp } from './clamp';
import { getColorFromRGBA } from './getColorFromRGBA';
import { hsv2hsl } from './hsv2hsl';
import { hsv2rgb } from './hsv2rgb';
import type { IHSV, IColor } from './interfaces';

// Soften: to get closer to the background color's luminance
// (softening with a white background would be lightening, with black it'd be darkening)
// Strongen: opposite of soften

// Luminance multiplier constants for generating shades of a given color
const WhiteShadeTableBG = [0.027, 0.043, 0.082, 0.145, 0.184, 0.216, 0.349, 0.537]; // white bg
const BlackTintTableBG = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043]; // black bg
const WhiteShadeTable = [0.537, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043, 0.027]; // white fg
const BlackTintTable = [0.537, 0.45, 0.349, 0.216, 0.184, 0.145, 0.082, 0.043]; // black fg
const LumTintTable = [0.88, 0.77, 0.66, 0.55, 0.44, 0.33, 0.22, 0.11]; // light (strongen all)
const LumShadeTable = [0.11, 0.22, 0.33, 0.44, 0.55, 0.66, 0.77, 0.88]; // dark (soften all)
const ColorTintTable = [0.96, 0.84, 0.7, 0.4, 0.12]; // default soften
const ColorShadeTable = [0.1, 0.24, 0.44]; // default strongen

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
 * @param shade - The Shade value to validate.
 */
export function isValidShade(shade?: Shade): boolean {
  return typeof shade === 'number' && shade >= Shade.Unshaded && shade <= Shade.Shade8;
}

function _isBlack(color: IColor): boolean {
  return color.r === 0 && color.g === 0 && color.b === 0;
}

function _isWhite(color: IColor): boolean {
  return color.r === MAX_COLOR_RGB && color.g === MAX_COLOR_RGB && color.b === MAX_COLOR_RGB;
}

function _darken(hsv: IHSV, factor: number): IHSV {
  return {
    h: hsv.h,
    s: hsv.s,
    v: clamp(hsv.v - hsv.v * factor, 100, 0),
  };
}

function _lighten(hsv: IHSV, factor: number): IHSV {
  return {
    h: hsv.h,
    s: clamp(hsv.s - hsv.s * factor, 100, 0),
    v: clamp(hsv.v + (100 - hsv.v) * factor, 100, 0),
  };
}

export function isDark(color: IColor): boolean {
  return hsv2hsl(color.h, color.s, color.v).l < 50;
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
 * @param color - The base color whose shade is to be computed
 * @param shade - The shade of the base color to compute
 * @param isInverted - Default false. Whether the given theme is inverted (reverse strongen/soften logic)
 */
export function getShade(color: IColor, shade: Shade, isInverted: boolean = false): IColor | null {
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  const hsl = hsv2hsl(color.h, color.s, color.v);
  let hsv = { h: color.h, s: color.s, v: color.v };
  const tableIndex = shade - 1;
  let _soften = _lighten;
  let _strongen = _darken;
  if (isInverted) {
    _soften = _darken;
    _strongen = _lighten;
  }
  if (_isWhite(color)) {
    // white
    hsv = _darken(hsv, WhiteShadeTable[tableIndex]);
  } else if (_isBlack(color)) {
    // black
    hsv = _lighten(hsv, BlackTintTable[tableIndex]);
  } else if (hsl.l / 100 > HighLuminanceThreshold) {
    // light
    hsv = _strongen(hsv, LumShadeTable[tableIndex]);
  } else if (hsl.l / 100 < LowLuminanceThreshold) {
    // dark
    hsv = _soften(hsv, LumTintTable[tableIndex]);
  } else {
    // default
    if (tableIndex < ColorTintTable.length) {
      hsv = _soften(hsv, ColorTintTable[tableIndex]);
    } else {
      hsv = _strongen(hsv, ColorShadeTable[tableIndex - ColorTintTable.length]);
    }
  }

  return getColorFromRGBA(assign(hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
}

// Background shades/tints are generated differently. The provided color will be guaranteed
//   to be the darkest or lightest one. If it is <50% luminance, it will always be the darkest,
//   otherwise it will always be the lightest.
export function getBackgroundShade(color: IColor, shade: Shade, isInverted: boolean = false): IColor | null {
  if (!color) {
    return null;
  }

  if (shade === Shade.Unshaded || !isValidShade(shade)) {
    return color;
  }

  let hsv = { h: color.h, s: color.s, v: color.v };
  const tableIndex = shade - 1;
  if (!isInverted) {
    // lightish
    hsv = _darken(hsv, WhiteShadeTableBG[tableIndex]);
  } else {
    // default: if (hsl.l / 100 < .5) { // darkish
    hsv = _lighten(hsv, BlackTintTableBG[BlackTintTable.length - 1 - tableIndex]);
  }

  return getColorFromRGBA(assign(hsv2rgb(hsv.h, hsv.s, hsv.v), { a: color.a }));
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
    if (x <= 0.03928) {
      return x / 12.92;
    } else {
      return Math.pow((x + 0.055) / 1.055, 2.4);
    }
  }

  const r1 = _getThing(color1.r / MAX_COLOR_RGB);
  const g1 = _getThing(color1.g / MAX_COLOR_RGB);
  const b1 = _getThing(color1.b / MAX_COLOR_RGB);
  let L1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1; // relative luminance of first color
  L1 += 0.05;

  const r2 = _getThing(color2.r / MAX_COLOR_RGB);
  const g2 = _getThing(color2.g / MAX_COLOR_RGB);
  const b2 = _getThing(color2.b / MAX_COLOR_RGB);
  let L2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2; // relative luminance of second color
  L2 += 0.05;

  // return the lighter color divided by darker
  return L1 / L2 > 1 ? L1 / L2 : L2 / L1;
}
