import { Swatch } from '../swatch';
import { isDark } from './is-dark';

/**
 * @internal
 */
export function directionByIsDark(color: Swatch): 1 | -1 {
  return isDark(color) ? -1 : 1;
}
