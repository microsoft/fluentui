import { IRGB, IHSL } from './color.types';
import { rgb2hsl, hsl2rgb } from './color.hsl';
import { cssColor, rgbToString } from './color';

/**
 * This file contains a set of color/contrast utilities
 * It turns out colors are hard! These utilities will hopefully come in handy
 *
 * Some optimizations and approximations for color space transforms and values
 *   could be interesting to explore and use here
 */

/**
 * An ISuggestionRange is an interface internal to the utilities in this file
 * It is primarily used to denote an acceptable range of relative luminance values
 */
interface ISuggestionRange {
  min: number;
  max: number;
}

/**
 * Converts an r, g, or b value in the sRGB color space to the corresponding value in linearRGB
 * This is necessary for relative luminance calculations
 * Formula defined at https://en.wikipedia.org/wiki/SRGB
 *
 * @param c - one of r g or b coming from sRGB
 */
function standardToLinear(c: number): number {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

/**
 * Calculate the relative luminance which is how bright the color is from the perspective of
 * a human eye.  Blue is much darker than green for instance so (0, 0, 255) is perceived to be
 * significantly darker than (0, 255, 0).  This is used to calculate contrast ratios between
 * two colors to ensure text is readable.
 * @param r - standard red value 0 to 255
 * @param g - standard green value 0 to 255
 * @param b - standard blue value 0 to 255
 */
export function relativeLuminance(r: number, g: number, b: number): number {
  // Formula defined by: http://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html#contrast-ratiodef
  // relative luminance: http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef

  // get the effective radius for each color
  const r1 = standardToLinear(r / 255);
  const g1 = standardToLinear(g / 255);
  const b1 = standardToLinear(b / 255);

  // relative luminance adjusts the R/G/B values by modifiers for their perceived brightness
  // to produce lightness result for how the eye perceives the color
  return 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
}

/**
 * A contrast ratio calculator
 * Contrast ratios (text on background) are fundamental for determining the readability of text
 * Formula from https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
 *
 * @param relLumA - a relative luminance value
 * @param relLumB - a relative luminacne value
 */
export function contrastRatio(relLumA: number, relLumB: number): number {
  const lighter: number = relLumA > relLumB ? relLumA : relLumB;
  const darker: number = relLumA > relLumB ? relLumB : relLumA;
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * A wrapper around contrast ratio calculation using the IRGB interface
 *
 * @param c1 - first color value
 * @param c2 - second color value
 */
export function calcContrastRatio(c1: IRGB, c2: IRGB): number {
  const relC1: number = relativeLuminance(c1.r, c1.g, c1.b);
  const relC2: number = relativeLuminance(c2.r, c2.g, c2.b);
  return contrastRatio(relC1, relC2);
}

/**
 * TODO: There are cases where the desired ratios can be achieved by going either lighter or darker
 *   It may be cool and not too much work to add an additional argument allowing consumers to choose
 *   get lighter or darker if that choice is there to be made
 *
 * Returns a suggested relative luminance range given a constant color
 * Note that it is possible that the desired ratio is unachievable
 * In these cases this function will return a [-1, -1] or [2, 2] range
 * The different ranges are used to default to white or black in the exposed adjustForContrast
 *
 * @param color - the constant IColor upon which we want to contrast with
 * @param desiredRatio - a contrast ratio (generally from some accesibility standard)
 */
function getContrastingLuminanceRange(color: IRGB, desiredRatio: number): ISuggestionRange {
  const relLum: number = relativeLuminance(color.r, color.g, color.b);

  // when background is lighter, solve for darker
  let suggestion: number = (relLum + 0.05) / desiredRatio - 0.05;
  if (suggestion > 0 && suggestion < 1) {
    return { min: 0, max: suggestion };
  }

  // when background is darker, text needs to be lighter
  suggestion = desiredRatio * (relLum + 0.05) - 0.05;
  if (suggestion < 1 && suggestion > 0) {
    return { min: suggestion, max: 1 };
  }

  // We can't achieve the desired ratio
  return { min: -1, max: -1 };
}

/**
 * TODO: There are some very interesting alternatives that can be explored
 *    Transforms into XYZ and LAB color spaces prior to scaling across a single dimension
 *    The problem is LAB is a larger color space and the projected values may not actually
 *    match desired relative luminance (still might be worth exploring)
 * TODO: If IColor is THE color interface we would like people to use, this should return it
 *
 * This is the core contrast adjusting algorithm
 * It will take an IRGB and return a transformed version
 * The new version will fall in the suggested relative luminance range
 * But will maintain the same tone (hue and saturation in this case)
 * It does so by transforming to an IHSL and searching across L values for a proper relative luminance
 *
 * @param color - a baseline color of which the returned color will maintain its hue and saturation
 * @param suggestedRelLuminance - a luminance range to use
 */
function contrastAdjust(color: IRGB, suggestedRelLuminance: ISuggestionRange): IRGB {
  // it is possible that the current color meets the suggested relative luminance
  let currRelLuminance: number = relativeLuminance(color.r, color.g, color.b);
  if (currRelLuminance >= suggestedRelLuminance.min && currRelLuminance <= suggestedRelLuminance.max) {
    return { r: color.r, g: color.g, b: color.b }; // make a copy to be safe
  }

  const hsl: IHSL = rgb2hsl(color);

  // allow for a .01 (totally arbitrary) error bound, also a good cutting off point
  // the error bound is safe as it will eventually result in an overcautios contrast ratio
  // and cap from 0 to 1 as relative luminance is normalized against that range
  const desiredMin: number = Math.max(suggestedRelLuminance.min - 0.01, 0);
  const desiredMax: number = Math.min(suggestedRelLuminance.max + 0.01, 1);

  // binary search across l values
  let minL: number = currRelLuminance < desiredMin ? hsl.l : 0;
  let maxL: number = currRelLuminance > desiredMax ? hsl.l : 1;
  let rgbFinal: IRGB = { r: 0, g: 0, b: 0 }; // default to black

  while (currRelLuminance < desiredMin || currRelLuminance > desiredMax) {
    hsl.l = (maxL + minL) / 2;
    rgbFinal = hsl2rgb(hsl);
    currRelLuminance = relativeLuminance(rgbFinal.r, rgbFinal.g, rgbFinal.b);
    if (currRelLuminance > desiredMax) {
      maxL = (maxL + minL) / 2;
    } else if (currRelLuminance < desiredMin) {
      minL = (maxL + minL) / 2;
    }
  }

  return rgbFinal;
}

/**
 * If possible, this will return a valid color to use to contrast against a background
 * The returned color attempts to maintain the chromaticity of the baseline color
 * If the desired ratio is unachievable white or black (dependent on target's relative luminance)
 * will be used
 *
 * @param textColor - a color value serving as a baseline for the tone (hue and saturation) to maintain
 * @param backgroundColor - the target to contrast against
 * @param desiredRatio - a desired contrast ratio (default is WCAG 2 AA standard for normal text)
 */
export function adjustForContrast(baseline: IRGB, target: IRGB, desiredRatio: number = 4.5): IRGB {
  const desiredRelLuminance: ISuggestionRange = getContrastingLuminanceRange(target, desiredRatio);

  // default to black or white
  if (desiredRelLuminance.min === -1) {
    // go to black
    return { r: 0, g: 0, b: 0 };
  }
  if (desiredRelLuminance.min === 2) {
    // go to white
    return { r: 255, g: 255, b: 255 };
  }

  return contrastAdjust(baseline, desiredRelLuminance);
}

/**
 * Gets a (potentially cached) rgb value for a given string
 * @param lookup - lookup table for looking up and caching name to rgb values
 * @param color - color string to lookup in the table
 */
function _getRgbForColor(lookup: IContrastCache['rgbLookup'], color: string): IRGB {
  if (!lookup[color]) {
    const colorAsRgb = cssColor(color);
    lookup[color] = colorAsRgb || { r: 0, b: 0, g: 0 };
  }
  return lookup[color];
}

export type RequiredContrast = 'low' | 'medium' | 'high';

const _contrastDefaults: { [K in RequiredContrast]: number } = {
  low: 3.0,
  medium: 4.5,
  high: 6.0,
};

/**
 * internal interface for caching contrast adjusted values.  This has a lookup table for converting
 * strings into rgb values and a cache for remembering previously calculated values since the
 * actual luminance adjustment process is potentially expensive and because the calculations will
 * always be constant for a given pair of values.
 */
interface IContrastCache {
  rgbLookup: {
    [color: string]: IRGB;
  };
  cache: {
    [bgColor: string]: {
      [fgColor: string]: { [K in RequiredContrast]?: string };
    };
  };
}

/**
 * internal cache object
 */
const _contrastCache: IContrastCache = {
  rgbLookup: {},
  cache: {},
};

/**
 * Take two strings representing a foreground and background color and potentially return a new foreground
 * color value which has an acceptable level of contrast with the background.  Because this can be expensive
 * it has an internal cache.
 * @param color - foreground color to potentially adjust for contrast
 * @param backgroundColor - background color to that the color needs to be shown on
 * @param desiredRatio - desired contrast ratio, defaults to 4.5
 */
export function getContrastingColor(
  color: string,
  backgroundColor: string,
  requiredContrast: RequiredContrast = 'medium',
): string {
  const desiredRatio = _contrastDefaults[requiredContrast];
  const cache = _contrastCache.cache;
  /* eslint-disable no-multi-assign */
  const bgEntry = (cache[backgroundColor] = cache[backgroundColor] || {});
  const fgEntry = (bgEntry[color] = bgEntry[color] || {});

  if (!fgEntry[requiredContrast]) {
    const rgbLookup = _contrastCache.rgbLookup;
    const fg = _getRgbForColor(rgbLookup, color);
    const bg = _getRgbForColor(rgbLookup, backgroundColor);
    const newFg = adjustForContrast(fg, bg, desiredRatio);
    fgEntry[requiredContrast] = rgbToString(newFg.r, newFg.g, newFg.b);
  }
  return fgEntry[requiredContrast]!;
}
