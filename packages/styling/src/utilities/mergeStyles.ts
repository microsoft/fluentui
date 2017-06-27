import { css, Rule } from 'glamor';
import { IStyle, IProcessedStyle } from '../interfaces/index';
import { FabricPerformance } from '@uifabric/utilities/lib/index';

/**
 * Takes a collection of collection of styles, defined in various formats, and compresses them into
 * a single thing of one format to return.
 * If any class names (strings) are passed in, it will return a list of space-separated class names,
 * using glamor to generate a class name for all passed in style objects.
 * Otherwise, all style objects passed in will be compressed into a single IProcessedStyle.
 *
 * @export
 * @param {(...(IStyle | string)[])} args
 * @returns {IStyle}
 */
export function mergeStyles(...args: (IStyle | string)[]): IProcessedStyle | string {
  const classes: string[] = [];
  const rules: Rule[] = [];

  function _parseArgs(theArgs: (IStyle | string)[]): void {
    for (const arg of theArgs) {
      if (arg) {
        if (typeof arg === 'string') {
          classes.push(arg);
        } else if (Array.isArray(arg)) {
          _parseArgs(arg);
        } else {
          rules.push(arg as Rule);
        }
      }
    }
  }

  _parseArgs(args);

  let rulesObject: IStyle = null;
  
  if (rules.length) {
    FabricPerformance.measure('glamor.css', () => {
      rulesObject = css(...rules);
    });
  }
  
  if (classes.length) {
    if (rulesObject) {
      classes.push(rulesObject.toString());
    }
    return classes.join(' ');
  }

  return rulesObject;
}
