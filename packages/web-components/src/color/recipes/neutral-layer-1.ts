import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayer1(palette: Palette, baseLayerLuminance: number): Swatch {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance)));
}
