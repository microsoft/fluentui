import { Palette } from '../palette';
import { InteractiveSwatchSet } from '../recipe';
import { Swatch } from '../swatch';

/**
 * @internal
 */
export function neutralFillLayer(palette: Palette, reference: Swatch, delta: number): InteractiveSwatchSet {
  const referenceIndex = palette.closestIndexOf(reference);

  return {
    rest: palette.get(referenceIndex - delta),
    hover: palette.get(referenceIndex - delta - 1),
    active: palette.get(referenceIndex - delta - 1),
    focus: palette.get(referenceIndex - delta),
  };
}
