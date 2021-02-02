import { subtract } from '../utilities/math';
import {
  neutralOutlineActiveDelta,
  neutralOutlineFocusDelta,
  neutralOutlineHoverDelta,
  neutralOutlineRestDelta,
  neutralPalette,
} from '../fluent-design-system';
import {
  ColorRecipe,
  colorRecipeFactory,
  SwatchFamily,
  SwatchFamilyResolver,
  swatchFamilyToSwatchRecipeFactory,
  SwatchFamilyType,
  SwatchRecipe,
} from './common';

import { accessibleAlgorithm } from './accessible-recipe';

export const neutralOutlineContrastAlgorithm: SwatchFamilyResolver = colorRecipeFactory(
  accessibleAlgorithm(
    neutralPalette,
    3,
    0,
    subtract(neutralOutlineHoverDelta, neutralOutlineRestDelta),
    subtract(neutralOutlineActiveDelta, neutralOutlineRestDelta),
    subtract(neutralOutlineFocusDelta, neutralOutlineRestDelta),
  ),
);

export const neutralOutlineContrast: ColorRecipe<SwatchFamily> = colorRecipeFactory(neutralOutlineContrastAlgorithm);
export const neutralOutlineContrastRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  neutralOutlineContrast,
);
export const neutralOutlineContrastHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  neutralOutlineContrast,
);
export const neutralOutlineContrastActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  neutralOutlineContrast,
);
export const neutralOutlineContrastFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  neutralOutlineContrast,
);
