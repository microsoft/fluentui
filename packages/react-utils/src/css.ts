/**
 * Serializable object.
 */
interface SerializableObject {
  toString?: () => string;
}

/**
 * css input type.
 */
type CssInput = string | SerializableObject | Record<string, boolean> | null | undefined | boolean;

/**
 * Concatination helper, which can merge class names together. Skips over falsey values.
 *
 * @public
 */
export function css(...args: CssInput[]): string {
  const classes = [];

  for (const arg of args) {
    if (arg) {
      if (typeof arg === 'string') {
        classes.push(arg);
      } else if (arg.hasOwnProperty('toString') && typeof arg.toString === 'function') {
        classes.push(arg.toString());
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        for (const key in arg as any) {
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
