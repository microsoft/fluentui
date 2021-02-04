import {
  neutralFillToggleActiveDelta,
  neutralFillToggleFocusDelta,
  neutralFillToggleHoverDelta,
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
export const neutralFillToggle: SwatchFamilyResolver = colorRecipeFactory(
  accessibleAlgorithm(
    neutralPalette,
    4.5,
    0,
    neutralFillToggleHoverDelta,
    neutralFillToggleActiveDelta,
    neutralFillToggleFocusDelta,
  ),
);

/**
 * @internal
 */
export const neutralFillToggleRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  neutralFillToggle,
);

/**
 * @internal
 */
export const neutralFillToggleHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  neutralFillToggle,
);

/**
 * @internal
 */
export const neutralFillToggleActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  neutralFillToggle,
);

/**
 * @internal
 */
export const neutralFillToggleFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  neutralFillToggle,
);
