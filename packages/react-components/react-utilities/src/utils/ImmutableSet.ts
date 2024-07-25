const internalSetSymbol = Symbol('#internalSet');

/**
 * @public
 * Disposed version of {@link ImmutableSet}.
 * Every operation that would modify the internal set will throw an error.
 * This is useful to ensure that an {@link ImmutableSet} is not modified after it has been copied.
 */
export interface DisposedImmutableSet<T> extends ImmutableSet<T> {
  add(value: T): never;
  delete(value: T): never;
  has(value: T): never;
  [Symbol.iterator](): never;
}

/**
 * @public
 *
 * Small immutable wrapper around the native Set implementation.
 * Every operation that would modify the set returns a new copy instance.
 *
 * Disposes the previous instance after it has been copied
 * to ensure performance.
 */
export class ImmutableSet<T> implements Iterable<T> {
  public readonly size: number;

  private [internalSetSymbol]?: Set<T>;

  public static empty(): ImmutableSet<never> {
    return new ImmutableSet(new Set());
  }
  /**
   * Creates a new {@link ImmutableSet} from an iterable.
   * If the iterable is already an {@link ImmutableSet}, it will be returned as is no copy will be made.
   * If the iterable is undefined, an empty {@link ImmutableSet} will be returned.
   */
  public static from<Value>(iterable?: Iterable<Value>): ImmutableSet<Value> {
    if (iterable === undefined) {
      return this.empty();
    }
    if (iterable instanceof this) {
      return iterable;
    }
    return new this(new Set(iterable));
  }

  public static isDisposed<T>(instance: ImmutableSet<T>): instance is DisposedImmutableSet<T> {
    return instance[internalSetSymbol] === undefined;
  }

  public static [Symbol.hasInstance](instance: object): boolean {
    return internalSetSymbol in instance;
  }

  /**
   * Do not use this constructor directly, use {@link ImmutableSet.from} instead,
   * as it will handle instance verifications (which might be problematic on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms | multiple realms}).,
   * avoid unnecessary copies and supports iterables.
   */
  constructor(internalSet: Set<T>) {
    this[internalSetSymbol] = internalSet;
    this.size = this[internalSetSymbol].size;
  }

  public add(value: T): ImmutableSet<T> {
    const next = this.copy();
    _getSet(next).add(value);
    return next;
  }

  public delete(value: T): ImmutableSet<T> {
    const next = this.copy();
    _getSet(next).delete(value);
    return next;
  }

  public has(value: T): boolean {
    return _getSet(this).has(value);
  }
  public copy(): ImmutableSet<T> {
    const internalSet = _getSet(this);
    delete this[internalSetSymbol];
    return new ImmutableSet(internalSet);
  }
  public [Symbol.iterator](): Iterator<T> {
    return _getSet(this).values();
  }
}

function _getSet<T>(immutableSet: ImmutableSet<T>): Set<T> {
  const set = immutableSet[internalSetSymbol];
  if (set === undefined) {
    throw new Error('ImmutableSet has been copied and can no longer be used');
  }
  return set;
}
