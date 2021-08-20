import { neutralLayer2Index } from './neutral-layer-2';
import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralLayer3(
  palette: Palette,
  luminance: number,
  layerDelta: number,
  fillRestDelta: number,
  fillHoverDelta: number,
  fillActiveDelta: number,
): Swatch {
  return palette.get(
    neutralLayer2Index(palette, luminance, layerDelta, fillRestDelta, fillHoverDelta, fillActiveDelta) + layerDelta,
  );
}
