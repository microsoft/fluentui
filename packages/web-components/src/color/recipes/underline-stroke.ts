import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch, SwatchRGB } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';
import { GradientSwatchRGB } from './gradient-swatch';

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
): InteractiveSwatchSet {
  const referenceIndex = palette.closestIndexOf(reference);
  const direction = directionByIsDark(reference);

  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);

  const midPosition = `calc(100% - ${width})`;

  function gradientHelper(index: number, applyShadow: boolean): Swatch {
    const color = palette.get(index);
    if (applyShadow) {
      const underlineColor = palette.get(index + direction * shadowDelta);
      const g = `linear-gradient(${color.toColorString()} ${midPosition}, ${underlineColor.toColorString()} ${midPosition}, ${underlineColor.toColorString()})`;
      return GradientSwatchRGB.fromObject(color as SwatchRGB, g);
    } else {
      return color;
    }
  }

  return {
    rest: gradientHelper(restIndex, true),
    hover: gradientHelper(hoverIndex, true),
    active: gradientHelper(activeIndex, false),
    focus: gradientHelper(focusIndex, true),
  };
}
