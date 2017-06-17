import { css, Rule } from 'glamor';
import { IStyle, IProcessedStyle } from '../interfaces/index';

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

let measurer = window['measurer'] = window['measurer'] || {
  count: 0,
  duartion: 0,
  cssDuration: 0,
  durations: []
};

export function mergeStyles(...args: (IStyle | string)[]): IProcessedStyle | string {
  const start = performance.now();
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

  measurer.count++;

  const cssstart = performance.now();
  const rulesObject: IStyle = rules.length ? css(...rules) : null;
  // const rulesObject: IStyle = rules.length ? { toString: () => '' } : null;
  const cssend = performance.now();

  if (performance.getEntriesByName('EUPL.glass').length === 0) {
    measurer.duartion += cssend - start;
    measurer.cssDuration += cssend - cssstart;
    measurer.durations.push(cssend - start);
  }

  if (classes.length) {
    if (rulesObject) {
      classes.push(rulesObject.toString());
    }
    return classes.join(' ');
  }

  return rulesObject;
}
