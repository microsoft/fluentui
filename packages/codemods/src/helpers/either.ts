import { Chainable, Flattened } from './chainable';

export interface Right<R, L> extends EitherInternal<R, L> {
  left: false;
  right: true;
  value: R;
}
export interface Left<R, L> extends EitherInternal<R, L> {
  left: true;
  right: false;
  value: L;
}

class EitherInternal<R, L> implements Chainable<R> {
  public left: boolean;
  public right: boolean;
  public value: R | L;

  public constructor(options: { left: boolean; right: boolean; value: R | L }) {
    this.left = options.left;
    this.right = options.right;
    this.value = options.value;
  }

  public fmap<T>(this: Either<R, L>, fn: (v: R) => T): Either<T, L> {
    if (this.right) {
      return Right(fn(this.value));
    }

    return Left(this.value);
  }

  public chain<T>(this: Either<R, L>, fn: (v: R) => Either<T, L>): Either<T, L> {
    if (this.right) {
      return fn(this.value);
    }
    return Left(this.value);
  }

  public flatten(): Flattened<R, Either<R, L>> {
    if (this.value && this.value instanceof EitherInternal) {
      return this.value as Flattened<R, Either<R, L>>;
    }
    return (this as unknown) as Flattened<R, Either<R, L>>;
  }

  public then<F>(this: Either<R, L>, fnR: (v: R) => F | Either<F, L>, fnL?: (v: L) => F | Either<F, L>): Either<F, L> {
    if (this.right) {
      return Right(fnR(this.value)).flatten() as Either<F, L>;
    }

    if (fnL) {
      return (Left(fnL(this.value)).flatten() as unknown) as Either<F, L>;
    }
    return Left(this.value);
  }

  public rightOrElse(this: Either<R, L>, rElse: R): R {
    if (this.right) {
      return this.value;
    }
    return rElse;
  }

  public leftOrElse(this: Either<R, L>, lElse: L): L {
    if (this.left) {
      return this.value;
    }
    return lElse;
  }
}

export const Left = <R, L>(value: L): Left<R, L> => {
  return new EitherInternal<R, L>({ value: value, left: true, right: false }) as Left<R, L>;
};

export const Right = <R, L>(value: R): Right<R, L> => {
  return new EitherInternal<R, L>({ value: value, left: false, right: true }) as Right<R, L>;
};

export type Either<R, L> = Left<R, L> | Right<R, L>;

export const DoEither = <R, L, T>(either: Either<R, L>, fnR: (v: R) => T, fnL: (v: L) => T): T => {
  if (either.left) {
    return fnL(either.value);
  }

  return fnR(either.value);
};
