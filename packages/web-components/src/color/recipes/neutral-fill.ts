import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';
import { isDark } from '../utilities/is-dark';

/**
 * This one is pretty custom. Rest and active are determined based on the reference index.
 * Hover and focus are determined either from reference in light mode and rest in dark mode.
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color to calculate a color for
 * @param restDelta - The rest offset
 * @param hoverDelta - The hover offset
 * @param activeDelta - The rest offset
 * @param focusDelta - The hover offset
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
  const direction = directionByIsDark(reference);
  const referenceIndex = palette.closestIndexOf(reference);

  const restIndex = referenceIndex + restDelta;
  const activeIndex = referenceIndex + activeDelta;

  const baseIndex = isDark(reference) ? restIndex : referenceIndex;

  const hoverIndex = baseIndex + direction * hoverDelta;
  const focusIndex = baseIndex + direction * focusDelta;

  return {
    rest: palette.get(restIndex),
    hover: palette.get(hoverIndex),
    active: palette.get(activeIndex),
    focus: palette.get(focusIndex),
  };
}
