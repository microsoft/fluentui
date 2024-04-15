export type Rgb = [number, number, number] | null;

export function convertColorToRgb(color: string): Rgb {
  if (color.includes('rgb') || color.includes('rgba')) {
    const rgb = color.replace(/[^\d,]/g, '').split(',');
    return [parseInt(rgb[0], 10), parseInt(rgb[1], 10), parseInt(rgb[2], 10)];
  }
  if (color.includes('#')) {
    return hexToRgb(color);
  }
  return null;
}

/**
 * Converts hex value to decimal and returns RGB value.
 *
 * @param hex - color in hex format
 *
 * @returns RGB value or null if the hex is invalid
 */
export function hexToRgb(hex: string): Rgb {
  if (!hex) {
    return null;
  }

  hex = hex.replace('#', '');

  if (hex.length === 6) {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
  }
  return null;
}

/**
 * Gets color in RGB and calculates Relative Luminance.
 * For more details see reference: https://www.w3.org/TR/WCAG20/#relativeluminancedef
 *
 * @param rgb - color in RGB format
 *
 * @returns relative luminance or undefined if the RGB is invalid
 */
export function calculateRelativeLuminance(rgb: Rgb): number | undefined {
  if (!rgb) {
    return;
  }
  const sR = rgb[0] / 255;
  const sG = rgb[1] / 255;
  const sB = rgb[2] / 255;

  const gammaCorrectedR = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const gammaCorrectedG = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const gammaCorrectedB = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  const relativeLuminance = 0.2126 * gammaCorrectedR + 0.7152 * gammaCorrectedG + 0.0722 * gammaCorrectedB;

  return relativeLuminance;
}

/**
 * Calculates contrast ratio between two colors.
 * Returned value will be in the range [1, 21]
 * 1 is no contrast, 21 is max contrast
 * For more details see reference: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 *
 * @param l1 - relative luminance of the first color
 * @param l2 - relative luminance of the second color
 *
 * @returns contrast ratio
 */
export function calculateContrastRatio(l1: number, l2: number): number {
  const lighterColorL1 = Math.max(l1, l2);
  const darkerColorL2 = Math.min(l1, l2);
  const LUMINANCE_THRESHOLD = 0.05;

  const contrastRatio = (lighterColorL1 + LUMINANCE_THRESHOLD) / (darkerColorL2 + LUMINANCE_THRESHOLD);

  return contrastRatio;
}

export function calculateContrastRatioFromRgb(rgb1: Rgb, rgb2: Rgb): number | undefined {
  if (!rgb1 || !rgb2) {
    return;
  }

  const l1 = calculateRelativeLuminance(rgb1);
  const l2 = calculateRelativeLuminance(rgb2);

  if ((l1 || l1 === 0) && (l2 || l2 === 0)) {
    return calculateContrastRatio(l1, l2);
  }
  return;
}

export function calculateContrastRatioFromHex(hex1: string, hex2: string): number | undefined {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  return calculateContrastRatioFromRgb(rgb1, rgb2);
}

export function getContrastRatio(color1: string, color2: string): number | undefined {
  const rgb1 = convertColorToRgb(color1);
  const rgb2 = convertColorToRgb(color2);
  return calculateContrastRatioFromRgb(rgb1, rgb2);
}
