import type { Palette } from '../palette';
import type { Swatch } from '../swatch';
import { neutralLayer2Index } from './neutral-layer-2';

/**
 * @internal
 */
export function neutralLayer4(
  palette: Palette,
  luminance: number,
  layerDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
): Swatch {
  return palette.get(
    neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) + layerDelta * 2,
  );
}
