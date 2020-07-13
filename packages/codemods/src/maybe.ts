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

const _makeMaybe = <T>(): MB<T> => {
  const mb: Partial<Maybe<T>> = {};
  mb.then = then.bind(null, mb);
  mb.thenMaybe = thenMaybe.bind(null, mb);
  mb.orElse = orElse.bind(null, mb);
  return mb as MB<T>;
};

export interface Just<T> extends MB<T> {
  value: T;
  just: true;
}

export interface Nothing<T> extends MB<T> {
  just: false;
}

export type Maybe<T> = Just<T> | Nothing<T>;

// Need to use assign so that the object remains correctly bound to the methods.
export const Nothing = <T>(): Nothing<T> => Object.assign<MB<T>, { just: false }>(_makeMaybe(), { just: false });

export const Just = <T>(value: T): Just<T> =>
  Object.assign<MB<T>, { just: true; value: T }>(_makeMaybe(), { just: true, value: value });

export const Maybe = <T>(value: T | undefined | null): Maybe<T> => {
  return value !== undefined && value !== null ? Just(value) : Nothing();
};

export const then = <T, N>(mb: Maybe<T>, fn: (v: T) => N): Maybe<N> => {
  return mb.just ? Just(fn(mb.value)) : Nothing();
};

export const thenMaybe = <T, N>(mb: Maybe<T>, fn: (v: T) => Maybe<N>): Maybe<N> => {
  return mb.just ? fn(mb.value) : Nothing();
};

export const orElse = <T>(mb: Maybe<T>, mElse: T): T => {
  return mb.just ? mb.value : mElse;
};
