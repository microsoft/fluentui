import { inRange } from 'lodash-es';
import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function accentFill(
  palette: Palette,
  neutralPalette: Palette,
  reference: Swatch,
  textColor: Swatch,
  contrastTarget: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  neutralFillRestDelta: number,
  neutralFillHoverDelta: number,
  neutralFillActiveDelta: number,
): InteractiveSwatchSet {
  const accent = palette.source;
  const referenceIndex = neutralPalette.closestIndexOf(reference);
  const swapThreshold = Math.max(neutralFillRestDelta, neutralFillHoverDelta, neutralFillActiveDelta);
  const direction = referenceIndex >= swapThreshold ? -1 : 1;
  const paletteLength = palette.swatches.length;
  const maxIndex = paletteLength - 1;
  const accentIndex = palette.closestIndexOf(accent);
  let accessibleOffset = 0;

  while (
    accessibleOffset < direction * hoverDelta &&
    inRange(accentIndex + accessibleOffset + direction, 0, paletteLength) &&
    textColor.contrast(palette.get(accentIndex + accessibleOffset + direction)) >= contrastTarget &&
    inRange(accentIndex + accessibleOffset + direction + direction, 0, maxIndex)
  ) {
    accessibleOffset += direction;
  }

  const hoverIndex = accentIndex + accessibleOffset;
  const restIndex = hoverIndex + direction * -1 * hoverDelta;
  const activeIndex = restIndex + direction * activeDelta;
  const focusIndex = restIndex + direction * focusDelta;

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex),
  };
}
