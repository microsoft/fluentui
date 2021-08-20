import type { Palette } from '../palette';
import type { InteractiveSwatchSet } from '../recipe';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function accentFill(
  palette: Palette,
  neutralPalette: Palette,
  reference: Swatch,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  neutralFillRestDelta: number,
  neutralFillHoverDelta: number,
  neutralFillActiveDelta: number,
): InteractiveSwatchSet {
  const accent = palette.source;
  const direction = 1;
  const accentIndex = palette.closestIndexOf(accent);

  const restIndex = accentIndex;
  const hoverIndex = restIndex + direction * hoverDelta;
  const activeIndex = restIndex + direction * activeDelta;
  const focusIndex = restIndex + direction * focusDelta;

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex),
  };
}
