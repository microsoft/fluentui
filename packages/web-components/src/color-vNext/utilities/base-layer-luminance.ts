import { SwatchRGB } from '../swatch';

export function baseLayerLuminanceSwatch(luminance: number) {
  return SwatchRGB.create(luminance, luminance, luminance);
}
