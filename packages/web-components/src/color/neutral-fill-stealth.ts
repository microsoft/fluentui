import {
  DesignSystem,
  DesignSystemResolver,
  neutralFillActiveDelta,
  neutralFillFocusDelta,
  neutralFillHoverDelta,
  neutralFillRestDelta,
  neutralFillStealthActiveDelta,
  neutralFillStealthFocusDelta,
  neutralFillStealthHoverDelta,
  neutralFillStealthRestDelta,
  neutralFillStealthSelectedDelta,
  neutralPalette,
} from '../fluent-design-system';
import { ColorRecipe, colorRecipeFactory, designSystemResolverMax, FillSwatchFamily, Swatch } from './common';
import { findClosestBackgroundIndex, getSwatch } from './palette';

const neutralFillStealthSwapThreshold: DesignSystemResolver<number> = designSystemResolverMax(
  neutralFillRestDelta,
  neutralFillHoverDelta,
  neutralFillActiveDelta,
  neutralFillFocusDelta,
  neutralFillStealthRestDelta,
  neutralFillStealthHoverDelta,
  neutralFillStealthActiveDelta,
  neutralFillStealthFocusDelta,
);

function neutralFillStealthAlgorithm(deltaResolver: DesignSystemResolver<number>): DesignSystemResolver<Swatch> {
  return (designSystem: DesignSystem): Swatch => {
    const backgroundIndex: number = findClosestBackgroundIndex(designSystem);
    const swapThreshold: number = neutralFillStealthSwapThreshold(designSystem);

    const direction: 1 | -1 = backgroundIndex >= swapThreshold ? -1 : 1;

    return getSwatch(backgroundIndex + direction * deltaResolver(designSystem), neutralPalette(designSystem));
  };
}

export const neutralFillStealthRest: ColorRecipe<Swatch> = colorRecipeFactory(
  neutralFillStealthAlgorithm(neutralFillStealthRestDelta),
);
export const neutralFillStealthHover: ColorRecipe<Swatch> = colorRecipeFactory(
  neutralFillStealthAlgorithm(neutralFillStealthHoverDelta),
);
export const neutralFillStealthActive: ColorRecipe<Swatch> = colorRecipeFactory(
  neutralFillStealthAlgorithm(neutralFillStealthActiveDelta),
);
export const neutralFillStealthFocus: ColorRecipe<Swatch> = colorRecipeFactory(
  neutralFillStealthAlgorithm(neutralFillStealthFocusDelta),
);
export const neutralFillStealthSelected: ColorRecipe<Swatch> = colorRecipeFactory(
  neutralFillStealthAlgorithm(neutralFillStealthSelectedDelta),
);

export const neutralFillStealth: ColorRecipe<FillSwatchFamily> = colorRecipeFactory((designSystem: DesignSystem) => {
  return {
    rest: neutralFillStealthRest(designSystem),
    hover: neutralFillStealthHover(designSystem),
    active: neutralFillStealthActive(designSystem),
    focus: neutralFillStealthFocus(designSystem),
    selected: neutralFillStealthSelected(designSystem),
  };
});
