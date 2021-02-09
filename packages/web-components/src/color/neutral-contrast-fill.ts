import {
  neutralContrastFillActiveDelta,
  neutralContrastFillFocusDelta,
  neutralContrastFillHoverDelta,
  neutralPalette,
} from '../fluent-design-system';
import {
  colorRecipeFactory,
  SwatchFamilyResolver,
  swatchFamilyToSwatchRecipeFactory,
  SwatchFamilyType,
  SwatchRecipe,
} from './common';
import { accessibleAlgorithm } from './accessible-recipe';

/**
 * @internal
 */
export const neutralContrastFill: SwatchFamilyResolver = colorRecipeFactory(
  accessibleAlgorithm(
    neutralPalette,
    14,
    0,
    neutralContrastFillHoverDelta,
    neutralContrastFillActiveDelta,
    neutralContrastFillFocusDelta,
  ),
);
/**
 * @internal
 */
export const neutralContrastFillRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  neutralContrastFill,
);
/**
 * @internal
 */
export const neutralContrastFillHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  neutralContrastFill,
);
/**
 * @internal
 */
export const neutralContrastFillActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  neutralContrastFill,
);
/**
 * @internal
 */
export const neutralContrastFillFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  neutralContrastFill,
);
