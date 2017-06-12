
export interface IDictionary {
  [className: string]: boolean;
}

export interface ISerializableObject {
  toString?: () => string;
}

export type ICssInput = string | ISerializableObject | IDictionary | null | undefined | boolean;

export function css(...args: ICssInput[]) {
  let classes = [];

  for (let arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if ((arg.hasOwnProperty('toString') && typeof (arg.toString) === 'function')) {
        classes.push(arg.toString());
      } else {
        for (let key in arg as any) {
          if ((arg as any)[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
