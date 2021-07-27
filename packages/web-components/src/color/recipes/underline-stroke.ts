import { InteractiveSet } from '../../design-tokens';
import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * @internal
 */
export function underlineStroke(
  palette: Palette,
  reference: Swatch,
  restDelta: number,
  hoverDelta: number,
  activeDelta: number,
  focusDelta: number,
  shadowDelta: number,
  width: string,
): InteractiveSet {
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = directionByIsDark(reference);

  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);

  const midPosition = `calc(100% - ${width})`;

  function gradientHelper(index: number, applyShadow: boolean): string {
    const color = palette.get(index);
    if (applyShadow) {
      const underlineColor = palette.get(index + direction * shadowDelta);
      return `linear-gradient(${color.toColorString()} ${midPosition}, ${underlineColor.toColorString()} ${midPosition}, ${underlineColor.toColorString()})`;
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
