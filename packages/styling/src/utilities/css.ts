import * as Glamor from 'glamor';

export interface ICssMapping {
  [className: string]: boolean;
}

export type ICssInput = string | Glamor.Rule | null | undefined | boolean;

export type IStyleType = string | Glamor.StyleAttribute;

export function css(...args: ICssInput[]): IStyleType {
  const classes: string[] = [];
  const rules: Glamor.Rule[] = [];

  for (const arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else {
        rules.push(arg as Glamor.Rule);
      }
    }
  }

  const rulesObject: Glamor.StyleAttribute = rules.length ? Glamor.css(...rules) : null;

  if (classes.length) {
    if (rulesObject) {
      classes.push(rulesObject.toString());
    }
    return classes.join(' ');
  }

  return rulesObject;
}
