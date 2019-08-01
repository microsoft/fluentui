import { extractStyleParts } from './extractStyleParts';
import { IStyle, IStyleBaseArray } from './IStyle';
import { IStyleOptions } from './IStyleOptions';
import { getStyleOptions } from './StyleOptionsState';
import { styleToClassName } from './styleToClassName';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string {
  return mergeStylesWithOptions(getStyleOptions(), ...args);
}

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 * Accepts a set of options that will be used when calculating styles.
 *
 * @public
 */
export function mergeStylesWithOptions(options: IStyleOptions, ...args: (IStyle | IStyleBaseArray | false | null | undefined)[]): string {
  const { classes, objects } = extractStyleParts(args);

  if (objects.length) {
    classes.push(styleToClassName(options, objects));
  }

  return classes.join(' ');
}
