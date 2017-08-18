import { IStyle } from './IStyle';
import { styleToClassName } from './styleToClassName';
import { Stylesheet } from './Stylesheet';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(...args: (IStyle | IStyle[])[]): string {
  let classes: string[] = [];
  let objects: {}[] = [];
  let stylesheet = Stylesheet.getInstance();

  function _processArgs(argsList: (IStyle | IStyle[])[]): void {
    for (const arg of argsList) {
      if (arg) {
        if (typeof arg === 'string') {
          let translatedArgs = stylesheet.argsFromClassName(arg);
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
