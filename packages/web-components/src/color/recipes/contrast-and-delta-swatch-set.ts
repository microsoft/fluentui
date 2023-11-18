import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';
import { isDark } from '../utilities/is-dark';

/**
 * @internal
 */
export function contrastAndDeltaSwatchSet(
  palette: Palette,
  reference: Swatch,
  baseContrast: number,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  direction?: -1 | 1 | null,
): InteractiveSwatchSet {
  if (direction === null || direction === void 0) {
    direction = directionByIsDark(reference);
  }
  const baseIndex = palette.closestIndexOf(palette.colorContrast(reference, baseContrast));

  return {
    rest: palette.get(baseIndex + direction * restDelta),
    hover: palette.get(baseIndex + direction * hoverDelta),
    active: palette.get(baseIndex + direction * activeDelta),
    focus: palette.get(baseIndex + direction * focusDelta),
  };
}

/**
 * @internal
 */
export function contrastAndDeltaSwatchSetByLuminance(
  palette: Palette,
  reference: Swatch,
  lightBaseContrast: number,
  lightRestDelta: number,
  lightHoverDelta: number,
  lightActiveDelta: number,
  lightFocusDelta: number,
  lightDirection: -1 | 1 | undefined | null = undefined,
  darkBaseContrast: number,
  darkRestDelta: number,
  darkHoverDelta: number,
  darkActiveDelta: number,
  darkFocusDelta: number,
  darkDirection: -1 | 1 | undefined | null = undefined,
): InteractiveSwatchSet {
  if (isDark(reference)) {
    return contrastAndDeltaSwatchSet(
      palette,
      reference,
      darkBaseContrast,
      darkRestDelta,
      darkHoverDelta,
      darkActiveDelta,
      darkFocusDelta,
      darkDirection,
    );
  } else {
    return contrastAndDeltaSwatchSet(
      palette,
      reference,
      lightBaseContrast,
      lightRestDelta,
      lightHoverDelta,
      lightActiveDelta,
      lightFocusDelta,
      lightDirection,
    );
  }
}
