import {
  neutralForegroundActiveDelta,
  neutralForegroundFocusDelta,
  neutralForegroundHoverDelta,
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
export const neutralForeground: SwatchFamilyResolver = colorRecipeFactory(
  accessibleAlgorithm(
    neutralPalette,
    14,
    0,
    neutralForegroundHoverDelta,
    neutralForegroundActiveDelta,
    neutralForegroundFocusDelta,
  ),
);

/**
 * @internal
 */
export const neutralForegroundRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  neutralForeground,
);

/**
 * @internal
 */
export const neutralForegroundHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  neutralForeground,
);

/**
 * @internal
 */
export const neutralForegroundActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  neutralForeground,
);

/**
 * @internal
 */
export const neutralForegroundFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  neutralForeground,
);
