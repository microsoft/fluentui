import { IStyle, IStyleBaseArray } from './IStyle';
import { Stylesheet } from './Stylesheet';

export interface IExtractStylePartsResult {
  classes: string[];
  objects: IStyleBaseArray;
}

/**
 * Separates the classes and style objects. Any classes that are pre-registered
 * args are auto expanded into objects.
 */
export function extractStyleParts(...args: (IStyle | IStyle[] | false | null | undefined)[]): IExtractStylePartsResult {
  const result = {
    classes: [],
    objects: []
  };

  _processArgs(result, args);

  return result;
}

function _processArgs<T>(result: IExtractStylePartsResult, args: (IStyle | IStyle[])[]): IExtractStylePartsResult {
  const stylesheet = Stylesheet.getInstance();
  const { classes, objects } = result;

  for (const arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        if (arg.indexOf(' ') >= 0) {
          _processArgs(result, arg.split(' '));
        } else {
          const translatedArgs = stylesheet.argsFromClassName(arg);

          if (translatedArgs) {
            _processArgs(result, translatedArgs);
          } else {
            // Avoid adding the same class twice.
            if (classes.indexOf(arg) === -1) {
              classes.push(arg);
            }
          }
        }
      } else if (Array.isArray(arg)) {
        _processArgs(result, arg);
      } else if (typeof arg === 'object') {
        objects.push(arg);
      }
    }
  }

  return result;
}
