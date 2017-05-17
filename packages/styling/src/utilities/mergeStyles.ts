import { css, Rule } from 'glamor';
import { IStyle, IRawStyle } from '../interfaces/index';

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
