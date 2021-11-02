import { Palette } from '../palette';
import { Swatch } from '../swatch';

/**
 * Color algorithm using contrast from the reference color.
 *
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param contrast - The desired minimum contrast
 *
 * @internal
 */
export function contrastSwatch(palette: Palette, reference: Swatch, contrast: number): Swatch {
  return palette.colorContrast(reference, contrast);
}
