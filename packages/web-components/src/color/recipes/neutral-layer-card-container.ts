import { clamp } from '@microsoft/fast-colors';
import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

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
