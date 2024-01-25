type Rgb = [number, number, number];
export function hexToRgb(hex: string): Rgb {
  if (!hex && hex.indexOf('#') === -1) {
    return hex;
  }
  // Remove the # symbol if present
  hex = hex.replace('#', '');

  // Convert the hex value to decimal
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGB color value
  return [r, g, b];
}

// https://www.w3.org/TR/WCAG20/#relativeluminancedef
// See reference
export function calculateRelativeLuminance(rgb: Rgb): number {
  const sR = rgb[0] / 255;
  const sG = rgb[1] / 255;
  const sB = rgb[2] / 255;

  const gammaCorrectedR = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const gammaCorrectedG = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const gammaCorrectedB = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  const relativeLuminance = 0.2126 * gammaCorrectedR + 0.7152 * gammaCorrectedG + 0.0722 * gammaCorrectedB;

  return relativeLuminance;
}

// from yellow #ffff00 -> #909000 , in rgb 144

// inside border 7575 -> to rgb 117

// todo add link to formulas
// return value will be in the range [1, 21]
// 1 is no contrast, 21 is max contrast
export function calculateContrastRatio(l1: number, l2: number): number {
  const lighterColorL1 = Math.max(l1, l2);
  const darkerColorL2 = Math.min(l1, l2);
  // name 0.5 luminanceThreshold
  const contrastRatio = (lighterColorL1 + 0.05) / (darkerColorL2 + 0.05);
  return contrastRatio;
}

export function calculateRelativeLuminanceFromHex(hex: string): number {
  const rgb = hexToRgb(hex);
  return calculateRelativeLuminance(rgb);
}

// I need to cache contrast ratio

export function calculateContrastRatioFromHex(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);

  const l1 = calculateRelativeLuminance(rgb1);
  const l2 = calculateRelativeLuminance(rgb2);

  return calculateContrastRatio(l1, l2);
}
