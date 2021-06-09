import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * @internal
 */
export function neutralStroke(
  palette: PaletteRGB,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
) {
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = directionByIsDark(reference);

  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex),
  };
}
