import { IStyle } from './IStyle';
import { styleToClassName } from './styleToClassName';
import { extractStyleParts } from './extractStyleParts';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(
  ...args: (IStyle | IStyle[] | false | null | undefined)[]
): string {
  const { classes, objects } = extractStyleParts(args);

  if (objects.length) {
    classes.push(styleToClassName(objects));
  }

  return classes.join(' ');
}
