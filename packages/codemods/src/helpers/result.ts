import { Chainable, Flattened } from './chainable';

export interface Ok<R, E> extends ResultInternal<R, E> {
  ok: true;
  value: R;
}

export interface Err<R, E> extends ResultInternal<R, E> {
  ok: false;
  value: E;
}

class ResultInternal<R, E> implements Chainable<R> {
  public ok: boolean;
  public value: R | E;

  public constructor(options: { ok: boolean; value: R | E }) {
    this.ok = options.ok;
    this.value = options.value;
  }

  public chain<T>(this: Result<R, E>, fn: (v: R) => Result<T, E>): Result<T, E> {
    if (this.ok) {
      return fn(this.value);
    }
    return Err(this.value);
  }

  public bothChain<R2, E2>(
    this: Result<R, E>,
    fnOk: (v: R) => Result<R2, E2>,
    fnErr: (v: E) => Result<R2, E2>,
  ): Result<R2, E2> {
    if (this.ok) {
      return fnOk(this.value);
    }
    return fnErr(this.value);
  }

  /**
   * Works just like chain, but is only called if this Result is an error.
   * This returns a new Result with type Result<R, NewType>
   */
  public errChain<T>(this: Result<R, E>, fn: (v: E) => Result<R, T>): Result<R, T> {
    if (!this.ok) {
      return fn(this.value);
    }
    return Ok(this.value);
  }

  public flatten(): Flattened<R, Result<R, E>> {
    if (this.value && this.value instanceof ResultInternal) {
      return this.value as Flattened<R, Result<R, E>>;
    }
    return this as unknown as Flattened<R, Result<R, E>>;
  }

  /**
   * This allows users to opperate on a presumed result without needing to know whether or not
   * the result was successful or not.
   * At each call if it is a result type of ok, it will call the supplied function, otherwise it
   * will return the current value with a new Err.
   *
   * @param fnOk Function that takes in an ok value of type R and returns either F or Result<F,E>
   */
  public then<F>(this: Result<R, E>, fnOk: (v: R) => F | Result<F, E>): Result<F, E> {
    if (this.ok) {
      return Ok(fnOk(this.value)).flatten() as Result<F, E>;
    }

    return Err(this.value);
  }

  /**
   * Works just like then, but is only called if this Result is an error.
   * This returns a new Result with type Result<R, NewType>
   */
  public errThen<F>(this: Result<R, E>, fnErr: (v: E) => F | Result<R, F>): Result<R, F> {
    if (!this.ok) {
      return Err(fnErr(this.value)).flatten() as Result<R, F>;
    }

    return Ok(this.value);
  }

  public okOrElse(this: Result<R, E>, okElse: R): R {
    if (this.ok) {
      return this.value;
    }
    return okElse;
  }

  public errOrElse(this: Result<R, E>, errElse: E): E {
    if (!this.ok) {
      return this.value;
    }
    return errElse;
  }

  /**
   * Takes in two functions, one which takes type R and the other which takes type E and both return
   * type T. This lets you handle either case and potentially return a unifying type. You might use this
   * to create a message for users.
   *
   * @param fnOk Function that maps from Ok value(R) to new type T
   * @param fnErr Function that maps from Err value(E) to new type T
   */
  public resolve<T>(this: Result<R, E>, fnOk: (v: R) => T, fnErr: (v: E) => T): T {
    if (this.ok) {
      return fnOk(this.value);
    }
    return fnErr(this.value);
  }

  /**
   * This function will either return the current Ok value or use
   * the function provided to generate that from the Err value that it contains
   * @param fnErr Function that maps from Err value(E) to current type R
   */
  public resolveOk(this: Result<R, E>, fnErr: (v: E) => R): R {
    if (this.ok) {
      return this.value;
    }
    return fnErr(this.value);
  }

  /**
   * This function will either return the current Err value or use
   * the function provided to generate that from the Ok value that it contains
   *
   * @param fnOk Function that maps from Ok value(R) to current type E
   */
  public resolveErr(this: Result<R, E>, fnOk: (v: R) => E): E {
    if (this.ok) {
      return fnOk(this.value);
    }
    return this.value;
  }
}

export const Ok = <R, E>(value: R): Ok<R, E> => {
  return new ResultInternal<R, E>({ value: value, ok: true }) as Ok<R, E>;
};

export const Err = <R, E>(value: E): Err<R, E> => {
  return new ResultInternal<R, E>({ value: value, ok: false }) as Err<R, E>;
};

/**
 * Result is a useful type for when you might want to handle errors down the line without swallowing them
 * while still preforming potentially several operations that could result in an error. A simple example could
 * be a dividing function that returns a Result. Instead of throwing an error that you cannot divide by zero,
 * it would be returned in an Err. This allows the rest of the program to execute cleanly.
 */
export type Result<R, E> = Err<R, E> | Ok<R, E>;

export const isOk = <R, E>(r: Result<R, E>): r is Ok<R, E> => {
  return r.ok;
};

export const isErr = <R, E>(r: Result<R, E>): r is Err<R, E> => {
  return !r.ok;
};

export const partitionResults = <R, E>(results: Result<R, E>[]): [R[], E[]] => {
  return results.reduce<[R[], E[]]>(
    (acc, value) => {
      if (value.ok) {
        acc[0].push(value.value);
      } else {
        acc[1].push(value.value);
      }
      return acc;
    },
    [[], []],
  );
};
