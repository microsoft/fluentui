/**
 * Dictionary of booleans.
 *
 * @public
 */
export interface IBooleanDictionary {
  [className: string]: boolean;
}

/**
 * Serializable object, which implements toString.
 *
 * @public
 */
export interface ISerializableObject {
  toString?: () => string;
}

/**
 * CSS helper input type.
 *
 * @public
 */
export type ICssInput = string | ISerializableObject | IBooleanDictionary | null | undefined | boolean;

/**
 * Helper which joins css class names together.
 *
 * @public
 */
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
