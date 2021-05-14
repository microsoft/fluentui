import { Swatch } from '../swatch';
import { PaletteRGB } from '../palette';

/**
 * The neutralForegroundHint color recipe
 * @param palette - The palette to operate on
 * @param reference - The reference color
 *
 * @internal
 */
export function neutralForegroundHint(palette: PaletteRGB, reference: Swatch) {
  return palette.colorContrast(reference, 4.5);
}
