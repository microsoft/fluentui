import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFillLayer(palette: Palette, reference: Swatch, delta: number): Swatch {
  const referenceIndex = palette.closestIndexOf(reference);

  return palette.get(referenceIndex - delta);
}
