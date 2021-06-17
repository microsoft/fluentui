import { clamp } from '@microsoft/fast-colors';
import { PaletteRGB } from '../palette';
import { SwatchRGB } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayerCardContainer(
  palette: PaletteRGB,
  relativeLuminance: number,
  layerDelta: number,
): SwatchRGB {
  const oldCardIndex: number = clamp(
    palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta,
    0,
    palette.swatches.length - 1,
  );
  return palette.get(oldCardIndex + layerDelta);
}
