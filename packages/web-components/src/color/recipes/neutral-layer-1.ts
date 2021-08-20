import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';
import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralLayer1(palette: Palette, baseLayerLuminance: number): Swatch {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance)));
}
