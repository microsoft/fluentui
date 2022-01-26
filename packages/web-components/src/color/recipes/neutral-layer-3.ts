import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { neutralLayer1Index } from './neutral-layer-1';

/**
 * @internal
 */
export function neutralLayer3(palette: Palette, baseLayerLuminance: number, layerDelta: number): Swatch {
  return palette.get(neutralLayer1Index(palette, baseLayerLuminance) + layerDelta * -1 * 2);
}
