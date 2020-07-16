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
  then: <N>(fn: (v: T) => N | Maybe<N>) => Maybe<N>;
  orElse: (mElse: T) => T;
  __maybe: true;
}

const _makeMaybe = <T>(): MB<T> => {
  const mb: Partial<Maybe<T>> = { __maybe: true };
  mb.then = then.bind(null, mb);
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

export type Maybe<T> = Just<NonNullable<T>> | Nothing<NonNullable<T>>;

// Need to use assign so that the object remains correctly bound to the methods.
export const Nothing = <T>(): Nothing<T> => Object.assign<MB<T>, { just: false }>(_makeMaybe(), { just: false });

export const Just = <T>(value: NonNullable<T>): Just<NonNullable<T>> => {
  if (value === undefined || value === null) {
    throw new Error('Maybe.Just cannot be undefined or null');
  }
  return Object.assign<MB<NonNullable<T>>, { just: true; value: NonNullable<T> }>(_makeMaybe(), {
    just: true,
    value: value,
  });
};

export const Maybe = <T>(value: T | undefined | null): Maybe<T> => {
  return value !== undefined && value !== null ? Just(value!) : Nothing();
};

/**
 *
 * Works like promises, it will wrap your value in a Maybe if you don't explicitly return one
 *
 */
export const then = <T, N>(mb: Maybe<T>, fn: (v: T) => N | Maybe<N>): Maybe<N> => {
  if (!mb.just) {
    return Nothing();
  }

  const ret = fn(mb.value);
  if ((ret as Maybe<N>).__maybe) {
    return ret as Maybe<N>;
  }
  return Maybe(ret as N);
};

export const orElse = <T>(mb: Maybe<T>, mElse: T): T => {
  return mb.just ? mb.value : mElse;
};
