import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * @internal
 */
export function neutralFillInput(
  palette: PaletteRGB,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  selectedDelta: number,
) {
  const direction = directionByIsDark(reference);
  const referenceIndex = palette.closestIndexOf(reference);

  return {
    rest: palette.get(referenceIndex - direction * restDelta),
    hover: palette.get(referenceIndex - direction * hoverDelta),
    active: palette.get(referenceIndex - direction * activeDelta),
    focus: palette.get(referenceIndex - direction * focusDelta),
    selected: palette.get(referenceIndex - direction * selectedDelta),
  };
}
