import { IRGB, IHSL } from './color.types';
import { rgb2hsl, hsl2rgb } from './color.hsl';
import { relativeLuminance, calcContrastRatio, adjustForContrast } from './color.contrast';

/**
 * These are temporary tests -- some are very likely to be changed
 * And are by no means a full test suite
 */

// IRGBs
const white: IRGB = { r: 255, g: 255, b: 255 };
const black: IRGB = { r: 0, g: 0, b: 0 };
const red: IRGB = { r: 255, g: 0, b: 0 };
const green: IRGB = { r: 0, g: 255, b: 0 };
const blue: IRGB = { r: 0, g: 0, b: 255 };
const random: IRGB = { r: 14, g: 123, b: 201 };

// IHSLs
const whiteHSL: IHSL = { h: 0, s: 0, l: 1 };
const blackHSL: IHSL = { h: 0, s: 0, l: 0 };
const redHSL: IHSL = { h: 0, s: 1, l: 0.5 };
const greenHSL: IHSL = { h: 120, s: 1, l: 0.5 };
const blueHSL: IHSL = { h: 240, s: 1, l: 0.5 };
const randomHSL: IHSL = { h: 205, s: 0.87, l: 0.422 };

// test conversion from hsl to rgb
describe('conversion testing', () => {
  it('converts from rgb to hsl correctly (white)', () => {
    const result: IHSL = rgb2hsl(white);
    expect(result.l).toEqual(whiteHSL.l);
  });

  it('converts from hsl to rgb correctly (white)', () => {
    const result: IRGB = hsl2rgb(whiteHSL);
    expect(result).toEqual(white);
  });

  it('converts from rgb to hsl correctly (black)', () => {
    const result: IHSL = rgb2hsl(black);
    expect(result.l).toEqual(blackHSL.l);
  });

  it('converts from hsl to rgb correctly (black', () => {
    const result: IRGB = hsl2rgb(blackHSL);
    expect(result).toEqual(black);
  });

  it('converts from rgb to hsl correctly (red)', () => {
    const result: IHSL = rgb2hsl(red);
    expect(result.l).toEqual(redHSL.l);
  });

  it('converts from hsl to rgb correctly (red', () => {
    const result: IRGB = hsl2rgb(redHSL);
    expect(result).toEqual(red);
  });

  it('converts from rgb to hsl correctly (green)', () => {
    const result: IHSL = rgb2hsl(green);
    expect(result.l).toEqual(greenHSL.l);
  });

  it('converts from hsl to rgb correctly (green', () => {
    const result: IRGB = hsl2rgb(greenHSL);
    expect(result).toEqual(green);
  });

  it('converts from rgb to hsl correctly (blue)', () => {
    const result: IHSL = rgb2hsl(blue);
    expect(result.l).toEqual(blueHSL.l);
  });

  it('converts from hsl to rgb correctly (blue', () => {
    const result: IRGB = hsl2rgb(blueHSL);
    expect(result).toEqual(blue);
  });

  it('converts from rgb to hsl correctly (random)', () => {
    const result: IHSL = rgb2hsl(random);
    expect(result.l).toBeCloseTo(randomHSL.l, 1);
  });

  it('converts from hsl to rgb correctly (random', () => {
    const result: IRGB = hsl2rgb(randomHSL);
    expect(result.r).toBeLessThanOrEqual(random.r + 1);
    expect(result.r).toBeGreaterThanOrEqual(random.r - 1);
    expect(result.g).toBeLessThanOrEqual(random.g + 1);
    expect(result.g).toBeGreaterThanOrEqual(random.g - 1);
    expect(result.b).toBeLessThanOrEqual(random.b + 1);
    expect(result.b).toBeGreaterThanOrEqual(random.b - 1);
  });
});

describe('contrast check', () => {
  it('properly calculates relative luminance', () => {
    let relLum: number = relativeLuminance(white.r, white.g, white.b);
    expect(relLum).toEqual(1);
    relLum = relativeLuminance(black.r, black.g, black.b);
    expect(relLum).toEqual(0);
    relLum = relativeLuminance(red.r, red.g, red.b);
    expect(relLum).toBeCloseTo(0.213);
    relLum = relativeLuminance(green.r, green.g, green.b);
    expect(relLum).toBeCloseTo(0.715);
    relLum = relativeLuminance(blue.r, blue.g, blue.b);
    expect(relLum).toBeCloseTo(0.072);
  });

  it('properly calculates contrast ratio', () => {
    let ratio: number = calcContrastRatio(white, black);
    expect(ratio).toEqual(21);
    ratio = calcContrastRatio(black, white);
    expect(ratio).toEqual(21);
    ratio = calcContrastRatio(red, green);
    expect(ratio).toBeCloseTo(2.9, 1);
    ratio = calcContrastRatio(red, blue);
    expect(ratio).toBeCloseTo(2.1, 1);
    ratio = calcContrastRatio(green, blue);
    expect(ratio).toBeCloseTo(6.3, 1);
  });

  it('properly adjusts contrast', () => {
    const newColor: IRGB = adjustForContrast(green, red, 4.2);
    const ratio: number = calcContrastRatio(newColor, red);
    // achieving a contrast ratio of 7 is impossible with red
    // have to settle for 5
    expect(ratio).toBeGreaterThanOrEqual(4);
    const newColorHSL: IHSL = rgb2hsl(newColor);
    expect(newColorHSL.h).toBeCloseTo(greenHSL.h);
    expect(newColorHSL.s).toBeCloseTo(greenHSL.s);
  });
});
