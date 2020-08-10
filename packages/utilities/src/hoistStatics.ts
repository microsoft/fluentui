/**
 * Allows you to hoist static functions in components.
 * Created for the purpose of fixing broken static functions in classes
 * that utilize decorators.
 *
 * @public
 * @param source - The object where the methods are hoisted from.
 * @param dest - The object to hoist the methods onto.
 * @returns The dest object with methods added
 */

export function hoistStatics<TSource extends Object, TDest>(source: TSource, dest: TDest): TDest {
  for (const name in source) {
    if (source.hasOwnProperty(name)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (dest as any)[name] = source[name];
    }
  }

  return dest;
}
