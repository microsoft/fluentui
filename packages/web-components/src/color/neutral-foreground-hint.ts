import { DesignSystemResolver, neutralPalette } from '../fluent-design-system';
import {
  colorRecipeFactory,
  SwatchFamily,
  swatchFamilyToSwatchRecipeFactory,
  SwatchFamilyType,
  SwatchRecipe,
} from './common';
import { accessibleAlgorithm } from './accessible-recipe';

function neutralForegroundHintAlgorithm(targetContrast: number): DesignSystemResolver<SwatchFamily> {
  return accessibleAlgorithm(neutralPalette, targetContrast, 0, 0, 0, 0);
}

/**
 * @internal
 * Hint text for normal sized text, less than 18pt normal weight
 */
export const neutralForegroundHint: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  colorRecipeFactory(neutralForegroundHintAlgorithm(4.5)),
);

/**
 * @internal
 * Hint text for large sized text, greater than 18pt or 16pt and bold
 */
export const neutralForegroundHintLarge: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  colorRecipeFactory(neutralForegroundHintAlgorithm(3)),
);
