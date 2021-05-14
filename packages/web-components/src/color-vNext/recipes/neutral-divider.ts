import { Swatch } from '../swatch';
import { PaletteRGB } from '../palette';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * The neutralDivider color recipe
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param delta - The offset from the reference
 *
 * @internal
 */
export function neutralDivider(palette: PaletteRGB, reference: Swatch, delta: number) {
  return palette.get(palette.closestIndexOf(reference) + directionByIsDark(reference) * delta);
}
