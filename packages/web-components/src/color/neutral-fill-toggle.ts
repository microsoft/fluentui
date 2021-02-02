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

export const neutralFillToggleRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  neutralFillToggle,
);
export const neutralFillToggleHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  neutralFillToggle,
);
export const neutralFillToggleActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  neutralFillToggle,
);
export const neutralFillToggleFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  neutralFillToggle,
);
