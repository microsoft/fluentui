const internalSetSymbol = Symbol('#internalSet');

/**
 * @public
 *
 * Small immutable wrapper around the native Set implementation.
 * Every operation that would modify the set returns a new copy instance.
 */
export class ImmutableSet<T> implements Iterable<T> {
  public static empty: ImmutableSet<never> = new ImmutableSet(new Set());
  public readonly size: number;

  private [internalSetSymbol]: Set<T>;

  public static dangerouslyGetInternalSet<Value>(set: ImmutableSet<Value>): Set<Value> {
    return set[internalSetSymbol];
  }

  public static copy<T>(immutableSet: ImmutableSet<T>): ImmutableSet<T> {
    return new ImmutableSet(new Set(immutableSet[internalSetSymbol]));
  }

  /**
   * Creates a new {@link ImmutableSet} from an iterable.
   * If the iterable is undefined, {@link ImmutableSet.empty} will be returned.
   * If the iterable is already an {@link ImmutableSet}, it will be returned as is no copy will be made.
   */
  public static from<Value>(iterable?: Iterable<Value>): ImmutableSet<Value> {
    if (iterable === undefined) {
      return this.empty;
    }
    if (iterable instanceof this) {
      return iterable;
    }
    return new this(new Set(iterable));
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    return Boolean(typeof instance === 'object' && instance && internalSetSymbol in instance);
  }

  /**
   * Do not use this constructor directly, use {@link ImmutableSet.from} instead.
   * {@link ImmutableSet.from} handles instance verification (which might be problematic on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms | multiple realms}),
   * avoid unnecessary copies, supports iterables and ensures that the internal set is never exposed.
   *
   *⚠️⚠️  _By using this constructor directly, you might end up with a mutable set, as it is not guaranteed that the internal set is not exposed._ ⚠️⚠️
   */
  constructor(internalSet: Set<T>) {
    this[internalSetSymbol] = internalSet;
    this.size = this[internalSetSymbol].size;
  }

  public add(value: T): ImmutableSet<T> {
    if (this.has(value)) {
      return this;
    }
    const copy = ImmutableSet.copy(this);
    copy[internalSetSymbol].add(value);
    return copy;
  }

  public delete(value: T): ImmutableSet<T> {
    if (!this.has(value)) {
      return this;
    }
    const copy = ImmutableSet.copy(this);
    copy[internalSetSymbol].delete(value);
    return copy;
  }

  public has(value: T): boolean {
    return this[internalSetSymbol].has(value);
  }

  public [Symbol.iterator](): Iterator<T> {
    return this[internalSetSymbol].values();
  }
}
