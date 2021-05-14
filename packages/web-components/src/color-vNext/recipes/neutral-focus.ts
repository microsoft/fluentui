import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFocus(palette: PaletteRGB, reference: Swatch) {
  return palette.colorContrast(reference, 3.5);
}
