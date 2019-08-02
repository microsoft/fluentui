import { extractStyleParts } from './extractStyleParts';
import { IStyle, IStyleBaseArray } from './IStyle';
import { styleToClassName } from './styleToClassName';
import { IStyleOptions } from './IStyleOptions';

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
