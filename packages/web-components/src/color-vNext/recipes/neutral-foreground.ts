import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralForeground(palette: PaletteRGB, reference: Swatch) {
  return palette.colorContrast(reference, 14);
}
