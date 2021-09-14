import { InteractiveSet } from '../../design-tokens';
import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * @internal
 */
export function gradientShadowStroke(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  shadowDelta: number,
  direction?: -1 | 1,
  shadowPercentage: number = 10,
): InteractiveSet {
  const referenceIndex = palette.closestIndexOf(reference);
  if (direction === void 0) {
    direction = directionByIsDark(reference);
  }

  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);

  const startPosition = direction === -1 ? shadowPercentage : 100 - shadowPercentage;

  function gradientHelper(index: number, applyShadow: boolean): string {
    const color = palette.get(index);
    if (applyShadow) {
      // Shadow is actually "highlight" on top in dark mode.
      const shadowColor = palette.get(index + direction! * shadowDelta);
      const startColor = direction === -1 ? shadowColor : color;
      const endColor = direction === -1 ? color : shadowColor;
      return `linear-gradient(${startColor.toColorString()} ${startPosition}%, ${endColor.toColorString()})`;
    } else {
      return color.toColorString();
    }
  }

  return {
    rest: gradientHelper(restIndex, true),
    hover: gradientHelper(hoverIndex, true),
    active: gradientHelper(activeIndex, false),
    focus: gradientHelper(focusIndex, true),
  };
}
