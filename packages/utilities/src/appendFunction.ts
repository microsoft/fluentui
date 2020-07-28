/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Returns a single function which will call each of the given functions in the context of the
 * parent.
 */
export function appendFunction(parent: any, ...functions: any[]): () => void {
  if (functions.length < 2) {
    return functions[0] as () => void;
  }

  return (...args: any[]): void => {
    functions.forEach((f: () => void) => f && f.apply(parent, args));
  };
}
