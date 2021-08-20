import type { Palette } from '../palette';
import type { Swatch } from '../swatch';

/**
 * The neutralForegroundHint color recipe
 * @param palette - The palette to operate on
 * @param reference - The reference color
 *
 * @internal
 */
export function neutralForegroundHint(palette: Palette, reference: Swatch): Swatch {
  return palette.colorContrast(reference, 4.5);
}
