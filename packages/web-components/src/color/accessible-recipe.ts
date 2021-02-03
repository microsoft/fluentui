import {
  backgroundColor,
  DesignSystem,
  DesignSystemResolver,
  evaluateDesignSystemResolver,
} from '../fluent-design-system';
import { Swatch, SwatchFamily } from './common';
import {
  findSwatchIndex,
  getSwatch,
  isDarkMode,
  minContrastTargetFactory,
  Palette,
  referenceColorInitialIndexResolver,
  swatchByContrast,
} from './palette';

function indexToSwatchFamily(
  accessibleIndex: number,
  palette: Palette,
  direction: number,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
): SwatchFamily {
  // One of the indexes will be rest, the other will be hover. Depends on the offsets and the direction.
  const accessibleIndex2: number = accessibleIndex + direction * Math.abs(restDelta - hoverDelta);

  const indexOneIsRestState: boolean =
    direction === 1 ? restDelta < hoverDelta : direction * restDelta > direction * hoverDelta;

  const restIndex: number = indexOneIsRestState ? accessibleIndex : accessibleIndex2;
  const hoverIndex: number = indexOneIsRestState ? accessibleIndex2 : accessibleIndex;

  const activeIndex: number = restIndex + direction * activeDelta;
  const focusIndex: number = restIndex + direction * focusDelta;

  return {
    rest: getSwatch(restIndex, palette),
    hover: getSwatch(hoverIndex, palette),
    active: getSwatch(activeIndex, palette),
    focus: getSwatch(focusIndex, palette),
  };
}

/**
 * @internal
 * Function to derive accessible colors from contrast and delta configuration.
 * Performs a simple contrast check against the colors and returns
 * the color that has the most contrast against the background. If contrast
 * cannot be retrieved correctly, function returns black.
 */
export function accessibleAlgorithm(
  palette: Palette | DesignSystemResolver<Palette>,
  minContrast: number | DesignSystemResolver<number>,
  restDelta: number | DesignSystemResolver<number>,
  hoverDelta: number | DesignSystemResolver<number>,
  activeDelta: number | DesignSystemResolver<number>,
  focusDelta: number | DesignSystemResolver<number>,
): DesignSystemResolver<SwatchFamily> {
  return (designSystem: DesignSystem): SwatchFamily => {
    const resolvedPalette: Palette = evaluateDesignSystemResolver(palette, designSystem);
    const direction: 1 | -1 = isDarkMode(designSystem) ? -1 : 1;

    const accessibleSwatch: Swatch = swatchByContrast(
      backgroundColor, // Compare swatches against the background
    )(
      resolvedPalette, // Use the provided palette
    )(
      referenceColorInitialIndexResolver, // Begin searching from the background color
    )(
      () => direction, // Search direction based on light/dark mode
    )(
      minContrastTargetFactory(evaluateDesignSystemResolver(minContrast, designSystem)), // A swatch is only valid if the contrast is greater than indicated
    )(
      designSystem, // Pass the design system
    );

    const accessibleIndex: number = findSwatchIndex(palette, accessibleSwatch)(designSystem);
    const resolvedRest: number = evaluateDesignSystemResolver(restDelta, designSystem);
    const resolvedHover: number = evaluateDesignSystemResolver(hoverDelta, designSystem);
    const resolvedActive: number = evaluateDesignSystemResolver(activeDelta, designSystem);
    const resolvedFocus: number = evaluateDesignSystemResolver(focusDelta, designSystem);

    return indexToSwatchFamily(
      accessibleIndex,
      resolvedPalette,
      direction,
      resolvedRest,
      resolvedHover,
      resolvedActive,
      resolvedFocus,
    );
  };
}
