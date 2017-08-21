import { IStyle } from './IStyle';
import { styleToClassName } from './styleToClassName';
import { Stylesheet } from './Stylesheet';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(
  ...args: (IStyle | IStyle[] | false | null | undefined)[]
): string {
  const classes: string[] = [];
  const objects: {}[] = [];
  const stylesheet = Stylesheet.getInstance();

  function _processArgs(argsList: (IStyle | IStyle[])[]): void {
    for (const arg of argsList) {
      if (arg) {
        if (typeof arg === 'string') {
          const translatedArgs = stylesheet.argsFromClassName(arg);
          if (translatedArgs) {
            objects.push(translatedArgs);
          } else {
            classes.push(arg);
          }
        } else if (Array.isArray(arg)) {
          _processArgs(arg);
        } else if (typeof arg === 'object') {
          objects.push(arg);
        }
      }
    }
  }

  _processArgs(args);

  if (objects.length) {
    classes.push(styleToClassName(objects));
  }

  return classes.join(' ');
}
