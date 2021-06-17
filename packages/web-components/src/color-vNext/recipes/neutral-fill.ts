import { Palette } from '../palette';
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
): Record<"rest" | "hover" | "active" | "focus", Swatch> {
  const referenceIndex = palette.closestIndexOf(reference);
  const threshold = Math.max(restDelta, hoverDelta, activeDelta, focusDelta);
  const direction = referenceIndex >= threshold ? -1 : 1;

  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta),
  };
}
