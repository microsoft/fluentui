import {
  accentPalette,
  backgroundColor,
  DesignSystem,
  DesignSystemResolver,
  evaluateDesignSystemResolver,
  neutralPalette,
} from '../fluent-design-system';
import { clamp, colorMatches, contrast, isValidColor, luminance, Swatch, SwatchResolver } from './common';

/**
 * The named palettes of the MSFT design system
 * @deprecated - use neutralPalette and accentPalette functions instead
 * @public
 */
export enum PaletteType {
  neutral = 'neutral',
  accent = 'accent',
}

/**
 * The structure of a color palette
 *
 * @public
 */
export type Palette = Swatch[];

/**
 * Retrieves a palette by name. This function returns a function that accepts
 * a design system, returning a palette a palette or null
 * @deprecated - use neutralPalette and accentPalette functions instead
 * @internal
 */
export function palette(paletteType: PaletteType): DesignSystemResolver<Palette> {
  return (designSystem: DesignSystem | undefined): Palette => {
    switch (paletteType) {
      case PaletteType.accent:
        return accentPalette(designSystem!);
      case PaletteType.neutral:
      default:
        return neutralPalette(designSystem!);
    }
  };
}

/**
 * A function to find the index of a swatch in a specified palette. If the color is found,
 * otherwise it will return -1
 *
 * @internal
 */
export function findSwatchIndex(
  paletteResolver: Palette | DesignSystemResolver<Palette>,
  swatch: Swatch,
): DesignSystemResolver<number> {
  return (designSystem: DesignSystem): number => {
    if (!isValidColor(swatch)) {
      return -1;
    }

    const colorPalette: Palette = evaluateDesignSystemResolver(paletteResolver, designSystem);
    const index: number = colorPalette.indexOf(swatch);

    // If we don't find the string exactly, it might be because of color formatting differences
    return index !== -1
      ? index
      : colorPalette.findIndex((paletteSwatch: Swatch): boolean => {
          return isValidColor(paletteSwatch) && colorMatches(swatch, paletteSwatch);
        });
  };
}

/**
 * Returns the closest swatch in a palette to an input swatch.
 * If the input swatch cannot be converted to a color, 0 will be returned
 *
 * @internal
 */
export function findClosestSwatchIndex(
  paletteResolver: Palette | DesignSystemResolver<Palette>,
  swatch: Swatch | DesignSystemResolver<Swatch>,
): DesignSystemResolver<number> {
  return (designSystem: DesignSystem): number => {
    const resolvedPalette: Palette = evaluateDesignSystemResolver(paletteResolver, designSystem);
    const resolvedSwatch: Swatch = evaluateDesignSystemResolver(swatch, designSystem);
    const index: number = findSwatchIndex(resolvedPalette, resolvedSwatch)(designSystem);
    let swatchLuminance: number;

    if (index !== -1) {
      return index;
    }

    try {
      swatchLuminance = luminance(resolvedSwatch);
    } catch (e) {
      swatchLuminance = -1;
    }

    if (swatchLuminance === -1) {
      return 0;
    }

    interface LuminanceMap {
      luminance: number;
      index: number;
    }

    return resolvedPalette
      .map(
        (mappedSwatch: Swatch, mappedIndex: number): LuminanceMap => {
          return {
            luminance: luminance(mappedSwatch),
            index: mappedIndex,
          };
        },
      )
      .reduce(
        (previousValue: LuminanceMap, currentValue: LuminanceMap): LuminanceMap => {
          return Math.abs(currentValue.luminance - swatchLuminance) <
            Math.abs(previousValue.luminance - swatchLuminance)
            ? currentValue
            : previousValue;
        },
      ).index;
  };
}

/**
 * @public
 * @privateRemarks
 * Determines if the design-system should be considered in "dark mode".
 * We're in dark mode if we have more contrast between #000000 and our background
 * color than #FFFFFF and our background color. That threshold can be expressed as a relative luminance
 * using the contrast formula as (1 + 0.5) / (bg + 0.05) === (bg + 0.05) / (0 + 0.05),
 * which reduces to the following, where bg is the relative luminance of the background color
 */
export function isDarkMode(designSystem: DesignSystem): boolean {
  return luminance(backgroundColor(designSystem)) <= (-0.1 + Math.sqrt(0.21)) / 2;
}

/**
 * @internal
 * @deprecated
 * Determines if the design-system should be considered in "light mode".
 */
export function isLightMode(designSystem: DesignSystem): boolean {
  return !isDarkMode(designSystem);
}

/**
 * @internal
 * Safely retrieves an index of a palette. The index is clamped to valid
 * array indexes so that a swatch is always returned
 */
export function getSwatch(index: number, colorPalette: Palette): Swatch;
export function getSwatch(
  index: DesignSystemResolver<number>,
  colorPalette: DesignSystemResolver<Palette>,
): DesignSystemResolver<Swatch>;
export function getSwatch(index: any, colorPalette: any): any {
  if (typeof index === 'function') {
    return (designSystem: DesignSystem): Swatch => {
      return colorPalette(designSystem)[clamp(index(designSystem), 0, colorPalette(designSystem).length - 1)];
    };
  } else {
    return colorPalette[clamp(index, 0, colorPalette.length - 1)];
  }
}

/**
 * @internal
 */
export function swatchByMode(
  paletteResolver: DesignSystemResolver<Palette>,
): (
  a: number | DesignSystemResolver<number>,
  b: number | DesignSystemResolver<number>,
) => DesignSystemResolver<Swatch> {
  return (
    valueA: number | DesignSystemResolver<number>,
    valueB?: number | DesignSystemResolver<number>,
  ): DesignSystemResolver<Swatch> => {
    return (designSystem: DesignSystem): Swatch => {
      return getSwatch(
        isDarkMode(designSystem)
          ? evaluateDesignSystemResolver(valueB!, designSystem)
          : evaluateDesignSystemResolver(valueA, designSystem),
        paletteResolver(designSystem),
      );
    };
  };
}

function binarySearch<T>(
  valuesToSearch: T[],
  searchCondition: (value: T) => boolean,
  startIndex: number = 0,
  endIndex: number = valuesToSearch.length - 1,
): T {
  if (endIndex === startIndex) {
    return valuesToSearch[startIndex];
  }

  const middleIndex: number = Math.floor((endIndex - startIndex) / 2) + startIndex;

  // Check to see if this passes on the item in the center of the array
  // if it does check the previous values
  if (searchCondition(valuesToSearch[middleIndex])) {
    return binarySearch(
      valuesToSearch,
      searchCondition,
      startIndex,
      middleIndex, // include this index because it passed the search condition
    );
  } else {
    return binarySearch(
      valuesToSearch,
      searchCondition,
      middleIndex + 1, // exclude this index because it failed the search condition
      endIndex,
    );
  }
}

// disable type-defs because this a deeply curried function and the call-signature is pretty complicated
// and typescript can work it out automatically for consumers
/**
 * Retrieves a swatch from an input palette, where the swatch's contrast against the reference color
 * passes an input condition. The direction to search in the palette is determined by an input condition.
 * Where to begin the search in the palette will be determined another input function that should return the starting index.
 * example: swatchByContrast(
 *              "#FFF" // compare swatches against "#FFF"
 *          )(
 *              neutralPalette // use the neutral palette from the DesignSystem - since this is a function, it will be evaluated with the DesignSystem
 *          )(
 *              () => 0 // begin searching for a swatch at the beginning of the neutral palette
 *          )(
 *              () => 1 // While searching, search in the direction toward the end of the array (-1 moves towards the beginning of the array)
 *          )(
 *              minContrastTargetFactory(4.5) // A swatch is only valid if the contrast is greater than 4.5
 *          )(
 *              designSystem // Pass the design-system. The first swatch that passes the previous condition will be returned from this function
 *          )
 * @internal
 */
export function swatchByContrast(referenceColor: string | SwatchResolver) {
  /**
   * A function that expects a function that resolves a palette
   */
  return (paletteResolver: Palette | DesignSystemResolver<Palette>) => {
    /**
     * A function that expects a function that resolves the index
     * of the palette that the algorithm should begin looking for a swatch at
     */
    return (indexResolver: (referenceColor: string, palette: Palette, designSystem: DesignSystem) => number) => {
      /**
       * A function that expects a function that determines which direction in the
       * palette we should look for a swatch relative to the initial index
       */
      return (directionResolver: (referenceIndex: number, palette: Palette, designSystem: DesignSystem) => 1 | -1) => {
        /**
         * A function that expects a function that determines if the contrast
         * between the reference color and color from the palette are acceptable
         */
        return (contrastCondition: (contrastRatio: number) => boolean): DesignSystemResolver<Swatch> => {
          /**
           * A function that accepts a design-system. It resolves all of the curried arguments
           * and loops over the palette until we reach the bounds of the palette or the condition
           * is satisfied. Once either the condition is satisfied or we reach the end of the palette,
           * we return the color
           */
          return (designSystem: DesignSystem): Swatch => {
            const color: Swatch = evaluateDesignSystemResolver(referenceColor, designSystem);
            const sourcePalette: Palette = evaluateDesignSystemResolver(paletteResolver, designSystem);
            const length: number = sourcePalette.length;
            const initialSearchIndex: number = clamp(indexResolver(color, sourcePalette, designSystem), 0, length - 1);
            const direction: 1 | -1 = directionResolver(initialSearchIndex, sourcePalette, designSystem);

            function contrastSearchCondition(valueToCheckAgainst: Swatch): boolean {
              return contrastCondition(contrast(color, valueToCheckAgainst));
            }

            const constrainedSourcePalette: Palette = [].concat(sourcePalette as any);
            const endSearchIndex: number = length - 1;
            let startSearchIndex: number = initialSearchIndex;

            if (direction === -1) {
              // reverse the palette array when the direction that
              // the contrast resolves for is reversed
              constrainedSourcePalette.reverse();
              startSearchIndex = endSearchIndex - startSearchIndex;
            }

            return binarySearch(constrainedSourcePalette, contrastSearchCondition, startSearchIndex, endSearchIndex);
          };
        };
      };
    };
  };
}

/**
 * @internal
 * Resolves the index that the contrast search algorithm should start at
 */
export function referenceColorInitialIndexResolver(
  referenceColor: string,
  sourcePalette: Palette,
  designSystem: DesignSystem,
): number {
  return findClosestSwatchIndex(sourcePalette, referenceColor)(designSystem);
}

/**
 * @internal
 */
export function findClosestBackgroundIndex(designSystem: DesignSystem): number {
  return findClosestSwatchIndex(neutralPalette, backgroundColor(designSystem))(designSystem);
}

/**
 * @internal
 */
export function minContrastTargetFactory(targetContrast: number): (instanceContrast: number) => boolean {
  return (instanceContrast: number): boolean => instanceContrast >= targetContrast;
}
