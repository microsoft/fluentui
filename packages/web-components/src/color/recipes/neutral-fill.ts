import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';

/**
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color to calculate a color for
 * @param delta - The offset from the reference's location
 * @param threshold - Determines if a lighter or darker color than the reference will be picked.
 * @returns
 *
 * @internal
 */
export function neutralFill(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
): InteractiveSwatchSet {
  const referenceIndex = palette.closestIndexOf(reference);

  const restIndex = referenceIndex + restDelta;
  let hoverIndex = referenceIndex + hoverDelta;
  let activeIndex = referenceIndex + activeDelta;
  if (hoverIndex < 0) {
    hoverIndex = restIndex - hoverDelta;
    activeIndex = hoverIndex + activeDelta;
  }
  const focusIndex = referenceIndex + focusDelta;

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex),
  };
}
