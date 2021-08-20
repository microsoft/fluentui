import { directionByIsDark } from '../utilities/direction-by-is-dark';
import type { Palette } from '../palette';
import type { InteractiveSwatchSet } from '../recipe';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFillInput(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
): InteractiveSwatchSet {
  const direction = directionByIsDark(reference);
  const referenceIndex = palette.closestIndexOf(reference);

  return {
    rest: palette.get(referenceIndex - direction * restDelta),
    hover: palette.get(referenceIndex - direction * hoverDelta),
    active: palette.get(referenceIndex - direction * activeDelta),
    focus: palette.get(referenceIndex - direction * focusDelta),
  };
}
