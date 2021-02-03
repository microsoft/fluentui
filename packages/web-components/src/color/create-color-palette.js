import { ComponentStateColorPalette } from '@microsoft/fast-colors';

/**
 * Creates a color palette from a provided source color
 * @param baseColor - ColorRGBA64
 * @returns string[]
 *
 * @public
 */
export function createColorPalette(baseColor) {
  return new ComponentStateColorPalette({
    baseColor,
  }).palette.map(color => color.toStringHexRGB().toUpperCase());
}
