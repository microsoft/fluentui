import { css, Rule } from 'glamor';
import { IStyle, IRawStyle } from '../interfaces/index';

/**
 * Takes a collection of collection of styles, defined in various formats, and compresses them into
 * a single thing of one format to return.
 * If any class names (strings) are passed in, it will return a list of space-separated class names,
 * using glamor to generate a class name for all passed in style objects.
 * Otherwise, all style objects passed in will be compressed into a single IProcessedStyle.
 *
 * @export
 * @param {(...(IStyle | IRawStyle)[])} args
 * @returns {IStyle}
 */
export function mergeStyles(...args: (IStyle | IRawStyle)[]): IStyle {
  const classes: string[] = [];
  const rules: Rule[] = [];

  for (const arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else {
        rules.push(arg as Rule);
      }
    }
  }

  const rulesObject: IStyle = rules.length ? css(...rules) : null;

  if (classes.length) {
    if (rulesObject) {
      classes.push(rulesObject.toString());
    }
    return classes.join(' ');
  }

  return rulesObject;
}
