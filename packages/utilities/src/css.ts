/**
 * Dictionary of booleans.
 *
 * @internal
 */
export interface IDictionary {
  [className: string]: boolean;
}

/**
 * Serializable object.
 *
 * @internal
 */
export interface ISerializableObject {
  toString?: () => string;
}

/**
 * css input type.
 *
 * @internal
 */
export type ICssInput = string | ISerializableObject | IDictionary | null | undefined | boolean;

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function css(...args: ICssInput[]): string {
  let classes = [];

  for (let arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (arg.hasOwnProperty('toString') && typeof arg.toString === 'function') {
        classes.push(arg.toString());
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (let key in arg as any) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if ((arg as any)[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(' ');
}
