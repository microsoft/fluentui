import { calculateOverlayColor, ColorRGBA64, computeAlphaBlend, parseColorHexRGB } from '@microsoft/fast-colors';
import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch, SwatchRGB } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';
import { GradientSwatchRGB } from './gradient-swatch';

const black = new ColorRGBA64(0, 0, 0);
const white = new ColorRGBA64(1, 1, 1);

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
  blendWithReference: boolean = false,
): InteractiveSwatchSet {
  const referenceIndex = palette.closestIndexOf(reference);
  if (direction === void 0) {
    direction = directionByIsDark(reference);
  }

  function overlayHelper(color: Swatch): Swatch {
    if (blendWithReference) {
      const refIndex = palette.closestIndexOf(reference);
      const refSwatch = palette.get(refIndex);
      const overlaySolid = color.relativeLuminance < reference.relativeLuminance ? black : white;
      const overlayColor = calculateOverlayColor(
        parseColorHexRGB(color.toColorString())!,
        parseColorHexRGB(refSwatch.toColorString())!,
        overlaySolid,
      ).roundToPrecision(2);
      const blend = computeAlphaBlend(parseColorHexRGB(reference.toColorString())!, overlayColor);
      return SwatchRGB.from(blend);
    } else {
      return color;
    }
  }

  const restIndex = referenceIndex + direction * restDelta;
  const hoverIndex = restIndex + direction * (hoverDelta - restDelta);
  const activeIndex = restIndex + direction * (activeDelta - restDelta);
  const focusIndex = restIndex + direction * (focusDelta - restDelta);

  const startPosition = direction === -1 ? 0 : 100 - shadowPercentage;
  const endPosition = direction === -1 ? shadowPercentage : 100;

  function gradientHelper(index: number, applyShadow: boolean): Swatch {
    const color = palette.get(index);
    if (applyShadow) {
      // Shadow is actually "highlight" on top in dark mode.
      const shadowColor = palette.get(index + direction! * shadowDelta);
      const startColor = direction === -1 ? shadowColor : color;
      const endColor = direction === -1 ? color : shadowColor;
      const g = `linear-gradient(${overlayHelper(startColor).toColorString()} ${startPosition}%, ${overlayHelper(
        endColor,
      ).toColorString()} ${endPosition}%)`;
      return GradientSwatchRGB.fromObject(startColor as SwatchRGB, g);
    } else {
      return overlayHelper(color);
    }
  }

  return {
    rest: gradientHelper(restIndex, true),
    hover: gradientHelper(hoverIndex, true),
    active: gradientHelper(activeIndex, false),
    focus: gradientHelper(focusIndex, true),
  };
}
