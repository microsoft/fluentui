/**
 * Maybe is a pattern that helps ensure that you don't need null checks everywhere.
 * I endevoured to make it work the way promises do so it should feel familiar.
 * Using Maybe.then means that you can chain many functions without needing to check for null/undefined
 * constantly.
 *
 * CodeMods is an ideal place to use Maybe because there are numerous cases where something may or may
 * not exist.
 */
export interface MB<T> {
  then: <N>(fn: (v: T) => N) => Maybe<N>;
  thenMaybe: <N>(fn: (v: T) => Maybe<N>) => Maybe<N>;
  orElse: (mElse: T) => T;
}

function _makeMaybe<T>(): MB<T> {
  const mb: Partial<Maybe<T>> = {};
  mb.then = then.bind(null, mb);
  mb.thenMaybe = thenMaybe.bind(null, mb);
  mb.orElse = orElse.bind(null, mb);
  return mb as MB<T>;
}

export interface Just<T> extends MB<T> {
  value: T;
  just: true;
}

export interface Nothing<T> extends MB<T> {
  just: false;
}

export type Maybe<T> = Just<T> | Nothing<T>;

export const Nothing = <T>(): Nothing<T> => ({
  ..._makeMaybe(),
  just: false,
});

export const Just = <T>(value: T): Just<T> => ({ ..._makeMaybe<T>(), just: true, value });

export function then<T, N>(maybe: Maybe<T>, fn: (v: T) => N): Maybe<N> {
  return maybe.just ? Just(fn(maybe.value)) : Nothing();
}
export function thenMaybe<T, N>(maybe: Maybe<T>, fn: (v: T) => Maybe<N>): Maybe<N> {
  return maybe.just ? fn(maybe.value) : Nothing();
}

export function orElse<T>(maybe: Maybe<T>, mElse: T): T {
  return maybe.just ? maybe.value : mElse;
}
