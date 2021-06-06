import { backgroundColor, DesignSystem, neutralFillCardDelta, neutralPalette } from '../fluent-design-system';
import { Swatch, SwatchResolver } from './common';
import { findClosestSwatchIndex, getSwatch } from './palette';

const neutralCardFillAlgorithm: SwatchResolver = (designSystem: DesignSystem): Swatch => {
  const offset: number = neutralFillCardDelta(designSystem);
  const index: number = findClosestSwatchIndex(neutralPalette, backgroundColor(designSystem))(designSystem);
  return getSwatch(index - offset, neutralPalette(designSystem));
};

/**
 * @internal
 */
export function neutralFillCard(designSystem: DesignSystem): Swatch;

/**
 * @internal
 */
export function neutralFillCard(backgroundResolver: SwatchResolver): SwatchResolver;

/**
 * @internal
 */
export function neutralFillCard(arg: any): any {
  if (typeof arg === 'function') {
    return (designSystem: DesignSystem): Swatch => {
      return neutralCardFillAlgorithm(Object.assign({}, designSystem, { backgroundColor: arg(designSystem) }));
    };
  } else {
    return neutralCardFillAlgorithm(arg);
  }
}
