import { IStyle, IStyleBaseArray } from './IStyle';
import { mergeStylesWithOptions } from './mergeStylesWithOptions';
import { getStyleOptions } from './StyleOptionsState';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string {
  return mergeStylesWithOptions(getStyleOptions(), ...args);
}
