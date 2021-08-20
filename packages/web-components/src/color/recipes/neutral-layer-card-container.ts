import { clamp } from '@microsoft/fast-colors';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';
import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralLayerCardContainer(palette: Palette, relativeLuminance: number, layerDelta: number): Swatch {
  const oldCardIndex: number = clamp(
    palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta,
    0,
    palette.swatches.length - 1,
  );
  return palette.get(oldCardIndex + layerDelta);
}
