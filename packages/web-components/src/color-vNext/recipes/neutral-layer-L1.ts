import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';
import { baseLayerLuminanceSwatch } from '../utilities/base-layer-luminance';

export function neutralLayerL1(palette: PaletteRGB, baseLayerLuminance: number) {
  return palette.get(palette.closestIndexOf(baseLayerLuminanceSwatch(baseLayerLuminance)));
}
