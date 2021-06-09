import { PaletteRGB } from '../palette';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayerL1(palette: PaletteRGB, baseLayerLuminance: number) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance)));
}
