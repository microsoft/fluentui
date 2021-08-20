import { isDark } from './is-dark';
import type { Swatch } from '../swatch';

/**
 * @internal
 */
export function directionByIsDark(color: Swatch): 1 | -1 {
  return isDark(color) ? -1 : 1;
}
