import {
  DesignSystem,
  DesignSystemResolver,
  neutralFillInputActiveDelta,
  neutralFillInputFocusDelta,
  neutralFillInputHoverDelta,
  neutralFillInputRestDelta,
  neutralFillInputSelectedDelta,
  neutralPalette,
} from '../fluent-design-system';
import { findClosestBackgroundIndex, getSwatch, isDarkMode } from './palette';
import { ColorRecipe, colorRecipeFactory, FillSwatchFamily, Swatch, SwatchRecipe } from './common';

/**
 * Algorithm for determining neutral backplate colors
 */
function neutralFillInputAlgorithm(indexResolver: DesignSystemResolver<number>): DesignSystemResolver<Swatch> {
  return (designSystem: DesignSystem): Swatch => {
    const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;
    return getSwatch(
      findClosestBackgroundIndex(designSystem) - indexResolver(designSystem) * direction,
      neutralPalette(designSystem),
    );
  };
}

/**
 * @internal
 */
export const neutralFillInputRest: SwatchRecipe = colorRecipeFactory(
  neutralFillInputAlgorithm(neutralFillInputRestDelta),
);

/**
 * @internal
 */
export const neutralFillInputHover: SwatchRecipe = colorRecipeFactory(
  neutralFillInputAlgorithm(neutralFillInputHoverDelta),
);

/**
 * @internal
 */
export const neutralFillInputActive: SwatchRecipe = colorRecipeFactory(
  neutralFillInputAlgorithm(neutralFillInputActiveDelta),
);

/**
 * @internal
 */
export const neutralFillInputFocus: SwatchRecipe = colorRecipeFactory(
  neutralFillInputAlgorithm(neutralFillInputFocusDelta),
);

/**
 * @internal
 */
export const neutralFillInputSelected: SwatchRecipe = colorRecipeFactory(
  neutralFillInputAlgorithm(neutralFillInputSelectedDelta),
);

/**
 * @internal
 */
export const neutralFillInput: ColorRecipe<FillSwatchFamily> = colorRecipeFactory(
  (designSystem: DesignSystem): FillSwatchFamily => {
    return {
      rest: neutralFillInputRest(designSystem),
      hover: neutralFillInputHover(designSystem),
      active: neutralFillInputActive(designSystem),
      focus: neutralFillInputFocus(designSystem),
      selected: neutralFillInputSelected(designSystem),
    };
  },
);
