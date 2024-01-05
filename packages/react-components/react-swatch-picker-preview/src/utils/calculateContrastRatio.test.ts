import { calculateRelativeLuminance } from './calculateContrastRatio';

describe('calculateRelativeLuminance', () => {
  it('should calculate the relative luminance correctly', () => {
    // Test case 1: RGB values are all 0
    expect(calculateRelativeLuminance(0, 0, 0)).toBe(0);

    // Test case 2: RGB values are all 255
    expect(calculateRelativeLuminance(255, 255, 255)).toBeCloseTo(1, 5);

    // Test case 3: Random RGB values
    expect(calculateRelativeLuminance(100, 150, 200)).toBeCloseTo(0.17697, 5);
  });

  // Add more test cases if needed
});
