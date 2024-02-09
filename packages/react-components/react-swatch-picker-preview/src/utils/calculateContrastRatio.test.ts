import { calculateRelativeLuminanceFromHex } from './calculateContrastRatio';

describe('calculateRelativeLuminance', () => {
  // it('should calculate the relative luminance correctly', () => {
  //   // Test case 1: RGB values are all 0
  //   expect(calculateRelativeLuminance([0, 0, 0])).toBe(0);
  //   // Test case 2: RGB values are all 255
  //   expect(calculateRelativeLuminance([255, 255, 255])).toBeCloseTo(1, 5);
  //   // Test case 3: Random RGB values
  //   expect(calculateRelativeLuminance([100, 150, 200])).toBeCloseTo(0.17697, 5);
  // });
  it('should calculate the relative luminance correctly from hex', () => {
    // Test case 1: RGB values are all 0
    expect(calculateRelativeLuminanceFromHex('#fafafa')).toBeCloseTo(0.9559733532);
    // Test case 2: RGB values are all 255
    expect(calculateRelativeLuminanceFromHex('#FEFF37')).toBeCloseTo(0.9286666615);
    // Test case 3: Random RGB values
    expect(calculateRelativeLuminanceFromHex('#A7D08F')).toBeCloseTo(0.5531041035);
  });
  // Add more test cases if needed
});
