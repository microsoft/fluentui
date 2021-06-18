import { Swatch, SwatchRGB } from '../swatch';

export function baseLayerLuminanceSwatch(luminance: number): Swatch {
  return SwatchRGB.create(luminance, luminance, luminance);
}
