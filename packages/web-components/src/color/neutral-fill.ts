import {
  DesignSystem,
  DesignSystemResolver,
  neutralFillActiveDelta,
  neutralFillFocusDelta,
  neutralFillHoverDelta,
  neutralFillRestDelta,
  neutralFillSelectedDelta,
  neutralPalette,
} from '../fluent-design-system';
import {
  ColorRecipe,
  colorRecipeFactory,
  designSystemResolverMax,
  FillSwatchFamily,
  Swatch,
  SwatchRecipe,
} from './common';
import { findClosestBackgroundIndex, getSwatch } from './palette';

const neutralFillThreshold: DesignSystemResolver<number> = designSystemResolverMax(
  neutralFillRestDelta,
  neutralFillHoverDelta,
  neutralFillActiveDelta,
  neutralFillFocusDelta,
);

function neutralFillAlgorithm(deltaResolver: DesignSystemResolver<number>): DesignSystemResolver<Swatch> {
  return (designSystem: DesignSystem): Swatch => {
    const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
    const swapThreshold: number = neutralFillThreshold(designSystem);
    const direction: 1 | -1 = backgroundIndex >= swapThreshold ? -1 : 1;

    return getSwatch(backgroundIndex + direction * deltaResolver(designSystem), neutralPalette(designSystem));
  };
}

/**
 * @internal
 */
export const neutralFillRest: SwatchRecipe = colorRecipeFactory(neutralFillAlgorithm(neutralFillRestDelta));

/**
 * @internal
 */
export const neutralFillHover: SwatchRecipe = colorRecipeFactory(neutralFillAlgorithm(neutralFillHoverDelta));

/**
 * @internal
 */
export const neutralFillActive: SwatchRecipe = colorRecipeFactory(neutralFillAlgorithm(neutralFillActiveDelta));

/**
 * @internal
 */
export const neutralFillFocus: SwatchRecipe = colorRecipeFactory(neutralFillAlgorithm(neutralFillFocusDelta));

/**
 * @internal
 */
export const neutralFillSelected: SwatchRecipe = colorRecipeFactory(neutralFillAlgorithm(neutralFillSelectedDelta));

/**
 * @internal
 */
export const neutralFill: ColorRecipe<FillSwatchFamily> = colorRecipeFactory(
  (designSystem: DesignSystem): FillSwatchFamily => {
    return {
      rest: neutralFillRest(designSystem),
      hover: neutralFillHover(designSystem),
      active: neutralFillActive(designSystem),
      focus: neutralFillFocus(designSystem),
      selected: neutralFillSelected(designSystem),
    };
  },
);
