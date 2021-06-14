import { Swatch } from '../swatch';
import { Palette } from '../palette';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * The neutralDivider color recipe
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param delta - The offset from the reference
 *
 * @internal
 */
export function neutralDivider(palette: Palette, reference: Swatch, delta: number): Swatch {
  return palette.get(palette.closestIndexOf(reference) + directionByIsDark(reference) * delta);
}
