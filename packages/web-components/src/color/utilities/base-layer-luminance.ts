import { Swatch, SwatchRGB } from '../swatch';

export function baseLayerLuminanceSwatch(luminance: number): Swatch {
  return SwatchRGB.create(luminance, luminance, luminance);
}

/**
 * Recommended values for light and dark mode for {@link @fluentui/web-components#baseLayerLuminance}.
 *
 * @public
 */
export enum StandardLuminance {
  LightMode = 0.98,
  DarkMode = 0.15,
}
