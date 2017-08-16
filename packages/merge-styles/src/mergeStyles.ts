import { IStyle } from './IStyle';
import { styleToClassName } from './styleToClassName';

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function mergeStyles(...args: (IStyle | IStyle[])[]): string {
  let classes: string[] = [];
  let objects: {}[] = [];

  function _processArgs(argsList: (IStyle | IStyle[])[]): void {
    for (let i = 0; i < argsList.length; i++) {
      let arg = argsList[i];

      if (arg) {
        if (typeof arg === 'string') {
          classes.push(arg);
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
