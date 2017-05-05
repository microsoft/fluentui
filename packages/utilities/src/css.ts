
export interface ICssMapping {
  [className: string]: boolean;
}

export interface IStyle {
  toString?: () => string;
}

export type ICssInput = string | IStyle | ICssMapping | null | undefined | boolean;

export function css(...args: ICssInput[]) {
  let classes = [];

  for (let arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (arg.hasOwnProperty('toString')) {
        classes.push(arg.toString());
      } else {
        for (let key in arg as any) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
