import { Palette } from '../palette';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFillStealth(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
  fillFocusDelta: number,
): Record<"rest" | "hover" | "active" | "focus", Swatch> {
  const swapThreshold = Math.max(
    restDelta,
    hoverDelta,
    activeDelta,
    focusDelta,
    fillRestDelta,
    fillHoverDelta,
    fillActiveDelta,
    fillFocusDelta,
  );

  const referenceIndex = palette.closestIndexOf(reference);
  const direction: 1 | -1 = referenceIndex >= swapThreshold ? -1 : 1;

  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta),
  };
}
