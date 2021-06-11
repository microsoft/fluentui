import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFillLayer(palette: PaletteRGB, reference: Swatch, delta: number) {
  const referenceIndex = palette.closestIndexOf(reference);

  return palette.get(referenceIndex - delta);
}
