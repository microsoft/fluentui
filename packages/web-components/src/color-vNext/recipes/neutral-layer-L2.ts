import { PaletteRGB } from '../palette';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayerL2Index(
  palette: PaletteRGB,
  luminance: number,
  cardDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
) {
  return Math.max(
    palette.closestIndexOf(baseLayerLuminanceSwatch(luminance)) + cardDelta,
    fillRestDelta,
    fillHoverDelta,
    fillActiveDelta,
  );
}

/**
 * @internal
 */
export function neutralLayerL2(
  palette: PaletteRGB,
  luminance: number,
  cardDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
) {
  return palette.get(
    neutralLayerL2Index(palette, luminance, cardDelta, fillRestDelta, fillHoverDelta, fillActiveDelta),
  );
}
