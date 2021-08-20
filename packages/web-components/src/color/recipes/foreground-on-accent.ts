import { black, white } from '../utilities/color-constants';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function foregroundOnAccent(reference: Swatch, contrastTarget: number) {
  return reference.contrast(white) >= contrastTarget ? white : black;
}
