import { Swatch } from '../swatch';
import { black, white } from '../utilities/color-constants';

/**
 * @internal
 */
export function foregroundOnAccent(reference: Swatch, contrastTarget: number) {
  return reference.contrast(white) >= contrastTarget ? white : black;
}
