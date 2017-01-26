export interface ICssMapping {
  [className: string]: boolean;
}

export type ICssInput = string | ICssMapping;

export function css(...args: ICssInput[]) {
  let classes = [];

  for (let arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else {
        for (let key in arg) {
          if (arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
