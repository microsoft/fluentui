import {
  calculateRelativeLuminance,
  hexToRgb,
  calculateContrastRatio,
  calculateContrastRatioFromRgb,
  calculateContrastRatioFromHex,
} from './contrastUtils';

describe('calculateRelativeLuminance', () => {
  it('should calculate the relative luminance correctly', () => {
    expect(calculateRelativeLuminance(null)).toBe(undefined);
    expect(calculateRelativeLuminance([0, 0, 0])).toBe(0);
    expect(calculateRelativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
    expect(calculateRelativeLuminance([171, 255, 124])).toBeCloseTo(0.81633, 5);
  });
  it('should convert hex to rgb correctly', () => {
    expect(hexToRgb('')).toBe(null);
    expect(hexToRgb('#')).toBe(null);
    expect(hexToRgb('red')).toBe(null);
    expect(hexToRgb('#fff')).toBe(null);
    expect(hexToRgb('#000000')).toStrictEqual([0, 0, 0]);
    expect(hexToRgb('#ffffff')).toStrictEqual([255, 255, 255]);
    expect(hexToRgb('#abff7c')).toStrictEqual([171, 255, 124]);
  });

  it('should calculate the contrast ratio correctly', () => {
    expect(calculateContrastRatio(0, 0)).toBe(1);
    expect(calculateContrastRatio(0, 1)).toBeCloseTo(21, 5);
    expect(calculateContrastRatio(1, 0)).toBeCloseTo(21, 5);
    expect(calculateContrastRatio(0.5, 0.5)).toBe(1);
    expect(calculateContrastRatio(0.5, 0.75)).toBeCloseTo(1.45, 2);
    expect(calculateContrastRatio(0.75, 0.5)).toBeCloseTo(1.45, 2);
  });

  it('should calculate the contrast ratio correctly from RGB', () => {
    expect(calculateContrastRatioFromRgb([0, 0, 0], [0, 0, 0])).toBe(1);
    expect(calculateContrastRatioFromRgb([0, 0, 0], [255, 255, 255])).toBeCloseTo(21, 5);
    expect(calculateContrastRatioFromRgb([255, 255, 255], [0, 0, 0])).toBeCloseTo(21, 5);
    expect(calculateContrastRatioFromRgb([128, 128, 128], [128, 128, 128])).toBe(1);
    expect(calculateContrastRatioFromRgb([128, 128, 128], [192, 192, 192])).toBeCloseTo(2.17, 2);
    expect(calculateContrastRatioFromRgb([255, 255, 255], [255, 25, 33])).toBeCloseTo(3.88, 2);
  });

  it('should calculate the contrast ratio correctly from hex', () => {
    expect(calculateContrastRatioFromHex('#000000', '#000000')).toBe(1);
    expect(calculateContrastRatioFromHex('#000000', '#FFFFFF')).toBeCloseTo(21, 5);
    expect(calculateContrastRatioFromHex('#FFFFFF', '#000000')).toBeCloseTo(21, 5);
    expect(calculateContrastRatioFromHex('#808080', '#808080')).toBe(1);
    expect(calculateContrastRatioFromHex('#808080', '#C0C0C0')).toBeCloseTo(2.17, 2);
    expect(calculateContrastRatioFromHex('#FFFFFF', '#FF1921')).toBeCloseTo(3.88, 2);
  });
});
