import { DesignSystem, neutralDividerRestDelta, neutralPalette } from '../fluent-design-system';
import { findClosestBackgroundIndex, getSwatch, isDarkMode, Palette } from './palette';
import { colorRecipeFactory, Swatch, SwatchRecipe, SwatchResolver } from './common';

const neutralDividerAlgorithm: SwatchResolver = (designSystem: DesignSystem): Swatch => {
  const palette: Palette = neutralPalette(designSystem);
  const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
  const delta: number = neutralDividerRestDelta(designSystem);
  const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;

  const index: number = backgroundIndex + direction * delta;
  return getSwatch(index, palette);
};

/**
 * @internal
 */
export const neutralDividerRest: SwatchRecipe = colorRecipeFactory<Swatch>(neutralDividerAlgorithm);
