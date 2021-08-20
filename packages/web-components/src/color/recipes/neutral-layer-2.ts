import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';
import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralLayer2Index(
  palette: Palette,
  luminance: number,
  layerDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
): number {
  return Math.max(
    palette.closestIndexOf(baseLayerLuminanceSwatch(luminance)) + layerDelta,
    fillRestDelta,
    fillHoverDelta,
    fillActiveDelta,
  );
}

/**
 * @internal
 */
export function neutralLayer2(
  palette: Palette,
  luminance: number,
  layerDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
): Swatch {
  return palette.get(
    neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta),
  );
}
