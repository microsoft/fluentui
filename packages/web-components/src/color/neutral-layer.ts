import { clamp, ColorRGBA64 } from '@microsoft/fast-colors';
import { add, multiply, subtract } from '../utilities/math';
import {
  baseLayerLuminance,
  DesignSystem,
  DesignSystemResolver,
  neutralFillActiveDelta,
  neutralFillCardDelta,
  neutralFillHoverDelta,
  neutralFillRestDelta,
  neutralPalette,
} from '../fluent-design-system';
import { findClosestSwatchIndex, getSwatch, swatchByMode } from './palette';
import { ColorRecipe, colorRecipeFactory, designSystemResolverMax, Swatch } from './common';

/**
 * @public
 * Recommended values for light and dark mode for `baseLayerLuminance` in the design system.
 */
export enum StandardLuminance {
  LightMode = 1,
  DarkMode = 0.23,
}

function luminanceOrBackgroundColor(
  luminanceRecipe: DesignSystemResolver<string>,
  backgroundRecipe: DesignSystemResolver<string>,
): DesignSystemResolver<string> {
  return (designSystem: DesignSystem): string => {
    return baseLayerLuminance(designSystem) === -1 ? backgroundRecipe(designSystem) : luminanceRecipe(designSystem);
  };
}

/**
 * Find the palette color that's closest to the desired base layer luminance.
 */
const baseLayerLuminanceSwatch: DesignSystemResolver<Swatch> = (designSystem: DesignSystem): Swatch => {
  const luminance: number = baseLayerLuminance(designSystem);
  return new ColorRGBA64(luminance, luminance, luminance, 1).toStringHexRGB();
};

/**
 * Get the index of the base layer palette color.
 */
const baseLayerLuminanceIndex: DesignSystemResolver<number> = findClosestSwatchIndex(
  neutralPalette,
  baseLayerLuminanceSwatch,
);

/**
 * Get the actual value of the card layer index, clamped so we can use it to base other layers from.
 */
const neutralLayerCardIndex: DesignSystemResolver<number> = (designSystem: DesignSystem): number =>
  clamp(
    subtract(baseLayerLuminanceIndex, neutralFillCardDelta)(designSystem),
    0,
    neutralPalette(designSystem).length - 1,
  );

/**
 * Light mode L2 is significant because it happens at the same point as the neutral fill flip. Use this as the minimum index for L2.
 */
const lightNeutralLayerL2: DesignSystemResolver<number> = designSystemResolverMax(
  neutralFillRestDelta,
  neutralFillHoverDelta,
  neutralFillActiveDelta,
);

/**
 * The index for L2 based on luminance, adjusted for the flip in light mode if necessary.
 */
const neutralLayerL2Index: DesignSystemResolver<number> = designSystemResolverMax(
  add(baseLayerLuminanceIndex, neutralFillCardDelta),
  lightNeutralLayerL2,
);

/**
 * Dark mode L4 is the darkest recommended background in the standard guidance, which is
 * calculated based on luminance to work with variable sized ramps.
 */
const darkNeutralLayerL4: DesignSystemResolver<number> = (designSystem: DesignSystem): number => {
  const darkLum: number = 0.14;
  const darkColor: ColorRGBA64 = new ColorRGBA64(darkLum, darkLum, darkLum, 1);
  const darkRefIndex: number = findClosestSwatchIndex(neutralPalette, darkColor.toStringHexRGB())(designSystem);
  return darkRefIndex;
};

/**
 * @internal
 * Used as the background color for floating layers like context menus and flyouts.
 */
export const neutralLayerFloating: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(subtract(neutralLayerCardIndex, neutralFillCardDelta), neutralPalette),
    swatchByMode(neutralPalette)(0, subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 5))),
  ),
);

/**
 * @internal
 * Used as the background color for cards. Pair with `neutralLayerCardContainer` for the container background.
 */
export const neutralLayerCard: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(neutralLayerCardIndex, neutralPalette),
    swatchByMode(neutralPalette)(0, subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 4))),
  ),
);

/**
 * @internal
 * Used as the background color for card containers. Pair with `neutralLayerCard` for the card backgrounds.
 */
export const neutralLayerCardContainer: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(add(neutralLayerCardIndex, neutralFillCardDelta), neutralPalette),
    swatchByMode(neutralPalette)(neutralFillCardDelta, subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 3))),
  ),
);

/**
 * @internal
 * Used as the background color for the primary content layer (L1).
 */
export const neutralLayerL1: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(baseLayerLuminanceIndex, neutralPalette),
    swatchByMode(neutralPalette)(0, subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 3))),
  ),
);

/**
 * @internal
 * Alternate darker color for L1 surfaces. Currently the same as card container, but use
 * the most applicable semantic named recipe.
 */
export const neutralLayerL1Alt: ColorRecipe<Swatch> = neutralLayerCardContainer;

/**
 * @internal
 * Used as the background for the top command surface, logically below L1.
 */
export const neutralLayerL2: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(neutralLayerL2Index, neutralPalette),
    swatchByMode(neutralPalette)(lightNeutralLayerL2, subtract(darkNeutralLayerL4, multiply(neutralFillCardDelta, 2))),
  ),
);

/**
 * @internal
 * Used as the background for secondary command surfaces, logically below L2.
 */
export const neutralLayerL3: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(add(neutralLayerL2Index, neutralFillCardDelta), neutralPalette),
    swatchByMode(neutralPalette)(
      add(lightNeutralLayerL2, neutralFillCardDelta),
      subtract(darkNeutralLayerL4, neutralFillCardDelta),
    ),
  ),
);

/**
 * @internal
 * Used as the background for the lowest command surface or title bar, logically below L3.
 */
export const neutralLayerL4: ColorRecipe<Swatch> = colorRecipeFactory(
  luminanceOrBackgroundColor(
    getSwatch(add(neutralLayerL2Index, multiply(neutralFillCardDelta, 2)), neutralPalette),
    swatchByMode(neutralPalette)(add(lightNeutralLayerL2, multiply(neutralFillCardDelta, 2)), darkNeutralLayerL4),
  ),
);
