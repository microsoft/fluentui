import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayer1Index(palette: Palette, baseLayerLuminance: number): number {
  return palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance));
}

/**
 * @internal
 */
export function neutralLayer1(palette: Palette, baseLayerLuminance: number): Swatch {
  return palette.get(neutralLayer1Index(palette, baseLayerLuminance));
}
