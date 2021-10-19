import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

/**
 * @internal
 */
export function focusStrokeOuter(palette: Palette, reference: Swatch) {
  return palette.colorContrast(reference, 3.5);
}

/**
 * @internal
 */
export function focusStrokeInner(palette: Palette, reference: Swatch, focusColor: Swatch) {
  return palette.colorContrast(
    focusColor,
    3.5,
    palette.closestIndexOf(palette.source),
    (directionByIsDark(reference) * -1) as 1 | -1,
  );
}
