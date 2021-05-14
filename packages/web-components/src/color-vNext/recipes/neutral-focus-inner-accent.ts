import { PaletteRGB } from '../palette';
import { Swatch } from '../swatch';
import { directionByIsDark } from '../utilities/direction-by-is-dark';

export function neutralFocusInnerAccent(palette: PaletteRGB, reference: Swatch, focusColor: Swatch) {
  return palette.colorContrast(
    focusColor,
    3.5,
    palette.closestIndexOf(palette.source),
    (directionByIsDark(reference) * -1) as 1 | -1,
  );
}
