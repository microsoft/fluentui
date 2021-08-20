import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';
import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralLayerFloating(palette: Palette, relativeLuminance: number, layerDelta: number): Swatch {
  const cardIndex = palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta;
  return palette.get(cardIndex - layerDelta);
}
