import { PaletteRGB } from '../palette';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

/**
 * @internal
 */
export function neutralLayerCard(palette: PaletteRGB, relativeLuminance: number, cardDelta: number) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(relativeLuminance)) - cardDelta);
}
