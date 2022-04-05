import { IStyle, IStyleBaseArray } from './IStyle';
import { Stylesheet } from './Stylesheet';

/**
 * Separates the classes and style objects. Any classes that are pre-registered
 * args are auto expanded into objects.
 */
export function extractStyleParts(
  ...args: (IStyle | IStyle[] | false | null | undefined)[]
): { classes: string[]; objects: IStyleBaseArray } {
  const classes: string[] = [];
  const objects: {}[] = [];
  const stylesheet = Stylesheet.getInstance();

  function _processArgs(argsList: (IStyle | IStyle[])[]): void {
    for (const arg of argsList) {
      if (arg) {
        if (typeof arg === 'string') {
          if (arg.indexOf(' ') >= 0) {
            _processArgs(arg.split(' '));
          } else {
            const translatedArgs = stylesheet.argsFromClassName(arg);

            if (translatedArgs) {
              _processArgs(translatedArgs);
            } else {
              // Avoid adding the same class twice.
              if (classes.indexOf(arg) === -1) {
                classes.push(arg);
              }
            }
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

  return {
    classes,
    objects,
  };
}
