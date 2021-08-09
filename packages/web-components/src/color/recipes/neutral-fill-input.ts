import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

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
