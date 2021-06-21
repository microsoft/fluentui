import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayerFloating(palette: Palette, relativeLuminance: number, layerDelta: number): Swatch {
  const cardIndex = palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - layerDelta;
  return palette.get(cardIndex - layerDelta);
}
