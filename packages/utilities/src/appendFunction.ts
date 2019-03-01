// tslint:disable:no-any

/**
 * Returns a single function which will call each of the given functions in the context of the
 * parent.
 */
export function appendFunction<TRetVal>(parent: any, ...functions: (null | undefined | any)[]): () => TRetVal {
  if (functions.length < 2) {
    return functions[0] as () => TRetVal;
  }

  return function(...args: any[]): TRetVal {
    let retVal: TRetVal | undefined = undefined;

    functions.forEach((f: () => TRetVal) => f && (retVal = f.apply(parent, args)));

    return (retVal as any) as TRetVal;
  };
}
