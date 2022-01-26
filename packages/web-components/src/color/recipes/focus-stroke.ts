import { Palette } from '../palette';
import { Swatch } from '../swatch';
import { black, white } from '../utilities/color-constants';
import { isDark } from '../utilities/is-dark';

/**
 * @internal
 */
export function focusStrokeOuter(palette: Palette, reference: Swatch) {
  return isDark(reference) ? white : black;
}

/**
 * @internal
 */
export function focusStrokeInner(palette: Palette, reference: Swatch, focusColor: Swatch) {
  return isDark(reference) ? black : white;
}
