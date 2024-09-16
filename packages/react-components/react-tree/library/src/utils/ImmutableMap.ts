const internalMapSymbol = Symbol('#internalMap');

export class ImmutableMap<Key, Value> implements Iterable<[Key, Value]> {
  public static empty: ImmutableMap<never, never> = new ImmutableMap(new Map<never, never>());
  public readonly size: number;

  private [internalMapSymbol]: Map<Key, Value>;

  public static dangerouslyGetInternalMap<Key, Value>(immutableMap: ImmutableMap<Key, Value>): Map<Key, Value> {
    return immutableMap[internalMapSymbol];
  }

  public static copy<Key, Value>(immutableMap: ImmutableMap<Key, Value>): ImmutableMap<Key, Value> {
    return this.from(immutableMap[internalMapSymbol]);
  }

  /**
   * Creates a new {@link ImmutableMap} from an iterable.
   * If the iterable is undefined, {@link ImmutableMap.empty} will be returned.
   * If the iterable is already an {@link ImmutableMap}, it will be returned as is no copy will be made.
   */
  public static from<T extends [unknown, unknown]>(iterable?: Iterable<T>): ImmutableMap<T[0], T[1]>;
  /**
   * Creates a new {@link ImmutableMap} from an iterable with an auxiliary map function to modify the iterable.
   * If the iterable is undefined, {@link ImmutableMap.empty} will be returned.
   * If the iterable is already an {@link ImmutableMap}, it will be returned as is no copy will be made.
   * The map function will be called for each element in the iterable.
   */
  public static from<T, U extends [unknown, unknown]>(
    iterable: Iterable<T> | undefined,
    mapFn: (value: T) => U,
  ): ImmutableMap<U[0], U[1]>;
  public static from(
    iterable?: Iterable<unknown>,
    mapFn?: (value: unknown) => [unknown, unknown],
  ): ImmutableMap<unknown, unknown> {
    if (iterable === undefined) {
      return this.empty;
    }
    if (!mapFn) {
      if (iterable instanceof this) {
        return iterable;
      }
      // casting here is ok, as the function overload ensures that the iterable is
      // Iterable<[unknown, unknown]>
      // if mapFn is not provided
      const iterableAsTuple = iterable as Iterable<[unknown, unknown]>;
      return new this(new Map(iterableAsTuple));
    }
    const map = new Map<unknown, unknown>();
    for (const value of iterable) {
      map.set(...mapFn(value));
    }
    return new this(map);
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    return Boolean(typeof instance === 'object' && instance && internalMapSymbol in instance);
  }

  /**
   * Do not use this constructor directly, use {@link ImmutableMap.from} instead.
   * {@link ImmutableMap.from} handles instance verification (which might be problematic on {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof#instanceof_and_multiple_realms | multiple realms}),
   * avoid unnecessary copies, supports iterables and ensures that the internal map is never exposed.
   *
   *⚠️⚠️  _By using this constructor directly, you might end up with a mutable map, as it is not guaranteed that the internal map is not exposed._ ⚠️⚠️
   */
  constructor(internalMap: Map<Key, Value>) {
    this[internalMapSymbol] = internalMap;
    this.size = this[internalMapSymbol].size;
  }

  public delete(key: Key): ImmutableMap<Key, Value> {
    if (!this.has(key)) {
      return this;
    }
    const copy = ImmutableMap.copy(this);
    copy[internalMapSymbol].delete(key);
    return copy;
  }
  public get(key: Key): Value | undefined {
    return this[internalMapSymbol].get(key);
  }
  public has(key: Key): boolean {
    return this[internalMapSymbol].has(key);
  }
  public set(key: Key, value: Value): ImmutableMap<Key, Value> {
    if (this.get(key) === value) {
      return this;
    }
    const copy = ImmutableMap.copy(this);
    copy[internalMapSymbol].set(key, value);
    return copy;
  }
  public [Symbol.iterator](): Iterator<[Key, Value]> {
    return this[internalMapSymbol].entries();
  }
}
