import {
  accentBaseColor,
  accentForegroundActiveDelta,
  accentForegroundFocusDelta,
  accentForegroundHoverDelta,
  accentForegroundRestDelta,
  accentPalette,
  backgroundColor,
  DesignSystem,
  DesignSystemResolver,
} from '../fluent-design-system';
import { findClosestSwatchIndex, findSwatchIndex, getSwatch, isDarkMode, Palette, swatchByContrast } from './palette';
import {
  colorRecipeFactory,
  Swatch,
  SwatchFamily,
  SwatchFamilyResolver,
  swatchFamilyToSwatchRecipeFactory,
  SwatchFamilyType,
  SwatchRecipe,
} from './common';

function accentForegroundAlgorithm(contrastTarget: number): DesignSystemResolver<SwatchFamily> {
  return (designSystem: DesignSystem): SwatchFamily => {
    const palette: Palette = accentPalette(designSystem);
    const accent: Swatch = accentBaseColor(designSystem);
    const accentIndex: number = findClosestSwatchIndex(accentPalette, accent)(designSystem);

    const stateDeltas: any = {
      rest: accentForegroundRestDelta(designSystem),
      hover: accentForegroundHoverDelta(designSystem),
      active: accentForegroundActiveDelta(designSystem),
      focus: accentForegroundFocusDelta(designSystem),
    };

    const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;

    const startIndex: number =
      accentIndex +
      (direction === 1
        ? Math.min(stateDeltas.rest, stateDeltas.hover)
        : Math.max(direction * stateDeltas.rest, direction * stateDeltas.hover));

    const accessibleSwatch: Swatch = swatchByContrast(
      backgroundColor, // Compare swatches against the background
    )(
      accentPalette, // Use the accent palette
    )(
      () => startIndex, // Begin searching based on accent index, direction, and deltas
    )(
      () => direction, // Search direction based on light/dark mode
    )(
      (swatchContrast: number) => swatchContrast >= contrastTarget, // A swatch is only valid if the contrast is greater than indicated
    )(
      designSystem, // Pass the design system
    );

    // One of these will be rest, the other will be hover. Depends on the offsets and the direction.
    const accessibleIndex1: number = findSwatchIndex(accentPalette, accessibleSwatch)(designSystem);
    const accessibleIndex2: number = accessibleIndex1 + direction * Math.abs(stateDeltas.rest - stateDeltas.hover);

    const indexOneIsRestState: boolean =
      direction === 1
        ? stateDeltas.rest < stateDeltas.hover
        : direction * stateDeltas.rest > direction * stateDeltas.hover;

    const restIndex: number = indexOneIsRestState ? accessibleIndex1 : accessibleIndex2;
    const hoverIndex: number = indexOneIsRestState ? accessibleIndex2 : accessibleIndex1;

    const activeIndex: number = restIndex + direction * stateDeltas.active;
    const focusIndex: number = restIndex + direction * stateDeltas.focus;

    return {
      rest: getSwatch(restIndex, palette),
      hover: getSwatch(hoverIndex, palette),
      active: getSwatch(activeIndex, palette),
      focus: getSwatch(focusIndex, palette),
    };
  };
}

/**
 * @internal
 */
export const accentForeground: SwatchFamilyResolver = colorRecipeFactory(accentForegroundAlgorithm(4.5));

/**
 * @internal
 */
export const accentForegroundLarge: SwatchFamilyResolver = colorRecipeFactory(accentForegroundAlgorithm(3));

/**
 * @internal
 */
export const accentForegroundRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  accentForeground,
);

/**
 * @internal
 */
export const accentForegroundHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  accentForeground,
);

/**
 * @internal
 */
export const accentForegroundActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  accentForeground,
);

/**
 * @internal
 */
export const accentForegroundFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  accentForeground,
);

/**
 * @internal
 */
export const accentForegroundLargeRest: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.rest,
  accentForegroundLarge,
);

/**
 * @internal
 */
export const accentForegroundLargeHover: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.hover,
  accentForegroundLarge,
);

/**
 * @internal
 */
export const accentForegroundLargeActive: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.active,
  accentForegroundLarge,
);

/**
 * @internal
 */
export const accentForegroundLargeFocus: SwatchRecipe = swatchFamilyToSwatchRecipeFactory(
  SwatchFamilyType.focus,
  accentForegroundLarge,
);
