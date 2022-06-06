import { BrandVariants } from '@fluentui/react-theme';
import { Palette, PaletteConfig, hexColorsFromPalette, hex_to_LCH } from '@fluent-blocks/colors';

/**
 * A palette is represented as a continuous curve through LAB space, made of two quadratic bezier curves that start at
 * 0L (black) and 100L (white) and meet at the LAB value of the provided key color.
 *
 * This function takes in a palette as input, which consists of:
 * keyColor:        The primary color in the LCH (Lightness Chroma Hue) color space
 * darkCp, lightCp: The control point of the quadratic beizer curve towards black and white, respectively (between 0-1).
 *                  Higher values move the control point toward the ends of the gamut causing chroma/saturation to
 *                  diminish more slowly near the key color, and lower values move the control point toward the key
 *                  color causing chroma/saturation to diminish more linearly.
 * hueTorsion:      Enables the palette to move through different hues by rotating the curve’s points in LAB space,
 *                  creating a helical curve

 * The function returns a set of brand tokens.
 */
export function getBrandTokensFromPalette(keyColor: string, { darkCp = 2 / 3, lightCp = 1 / 3, hueTorsion = 0 }) {
  const brandPalette: Palette = {
    keyColor: hex_to_LCH(keyColor),
    darkCp: darkCp,
    lightCp: lightCp,
    hueTorsion: hueTorsion,
  };
  const defaultPaletteConfig: PaletteConfig = {
    // The nShades and range values are based on a brand color audit
    nShades: 16,
    range: [1.42, 83.57],
    linearity: 0.77,
  };
  const hexColors = hexColorsFromPalette(
    brandPalette,
    defaultPaletteConfig.nShades,
    defaultPaletteConfig.range,
    defaultPaletteConfig.linearity,
  );
  return hexColors.reduce((acc: Record<string, string>, hexColor, h) => {
    acc[`${(h + 1) * 10}`] = hexColor;
    return acc;
  }, {}) as BrandVariants;
}
