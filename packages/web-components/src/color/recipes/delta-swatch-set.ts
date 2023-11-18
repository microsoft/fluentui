import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';
import { isDark } from '../utilities/is-dark';

/**
 * Color algorithm using deltas from the reference color for states.
 *
 * @param palette The palette to operate on
 * @param reference The reference color to calculate a color for
 * @param restDelta The rest state offset from reference
 * @param hoverDelta The hover state offset from reference
 * @param activeDelta The active state offset from reference
 * @param focusDelta The focus state offset from reference
 * @param direction The direction the deltas move on the ramp, default goes darker for light references and lighter for dark references
 *
 * @internal
 */
export function deltaSwatchSet(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  direction?: -1 | 1 | null,
): InteractiveSwatchSet {
  const referenceIndex = palette.closestIndexOf(reference);
  if (direction === null || direction === void 0) {
    direction = directionByIsDark(reference);
  }

  return {
    rest: palette.get(referenceIndex + direction * restDelta),
    hover: palette.get(referenceIndex + direction * hoverDelta),
    active: palette.get(referenceIndex + direction * activeDelta),
    focus: palette.get(referenceIndex + direction * focusDelta),
  };
}

/**
 * Color algorithm using deltas from the reference color for states, allowing different deltas based on a light or dark reference color.
 *
 * @param palette The palette to operate on
 * @param reference The reference color to calculate a color for
 * @param lightRestDelta The rest offset for a light reference
 * @param lightHoverDelta The hover offset for a light reference
 * @param lightActiveDelta The rest offset for a light reference
 * @param lightFocusDelta The hover offset for a light reference
 * @param lightDirection The direction the deltas move on the ramp, default goes darker for light references
 * @param darkRestDelta The rest offset for a dark reference
 * @param darkHoverDelta The hover offset for a dark reference
 * @param darkActiveDelta The rest offset for a dark reference
 * @param darkFocusDelta The hover offset for a dark reference
 * @param darkDirection The direction the deltas move on the ramp, default goes lighter for dark references
 *
 * @internal
 */
export function deltaSwatchSetByLuminance(
  palette: Palette,
  reference: Swatch,
  lightRestDelta: number,
  lightHoverDelta: number,
  lightActiveDelta: number,
  lightFocusDelta: number,
  lightDirection: -1 | 1 | undefined | null = undefined,
  darkRestDelta: number,
  darkHoverDelta: number,
  darkActiveDelta: number,
  darkFocusDelta: number,
  darkDirection: -1 | 1 | undefined | null = undefined,
): InteractiveSwatchSet {
  if (isDark(reference)) {
    return deltaSwatchSet(
      palette,
      reference,
      darkRestDelta,
      darkHoverDelta,
      darkActiveDelta,
      darkFocusDelta,
      darkDirection,
    );
  } else {
    return deltaSwatchSet(
      palette,
      reference,
      lightRestDelta,
      lightHoverDelta,
      lightActiveDelta,
      lightFocusDelta,
      lightDirection,
    );
  }
}
