import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralForeground(palette: Palette, reference: Swatch): Swatch {
  return palette.colorContrast(reference, 14);
}
