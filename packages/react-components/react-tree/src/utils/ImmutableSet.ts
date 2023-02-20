export class ImmutableSet<Value> {
  public static readonly emptySet = ImmutableSet.from<never>();
  /**
   * The number of (unique) elements in a ImmutableSet.
   */
  public readonly size: number;
  private _set: Set<Value>;

  /**
   * properly creates an ImmutableSet instance from an iterable
   */
  public static from<T>(iterable?: Iterable<T>) {
    const internalSet = new Set(iterable);
    return new ImmutableSet<T>(internalSet);
  }
  /**
   * Avoid using the constructor, use `ImmutableSet.from` instead.
   * @param internalSet a set that is used internally to store values.
   */
  constructor(internalSet: Set<Value>) {
    this._set = internalSet;
    this.size = this._set.size;
  }

  /**
   * Creates a new ImmutableSet containing all previous element plus the one provided as argument
   * @param value new value to be included in the new ImmutableSet instance
   */
  public add(value: Value): ImmutableSet<Value> {
    const nextSet = new Set(this);
    nextSet.add(value);
    return new ImmutableSet(nextSet);
  }
  /**
   * Returns a reference to ImmutableSet.emptySet
   */
  public clear(): ImmutableSet<Value> {
    return ImmutableSet.emptySet;
  }
  /**
   * Creates a new ImmutableSet with the original items and removes a specified value from the new ImmutableSet.
   */
  public delete(value: Value): ImmutableSet<Value> {
    const nextSet = new Set(this);
    nextSet.delete(value);
    return new ImmutableSet(nextSet);
  }
  /**
   * @returns a boolean indicating whether an element with the specified value exists in the ImmutableSet or not.
   */
  public has(value: Value): boolean {
    return this._set.has(value);
  }
  /** Iterates over values in the ImmutableSet. */
  public [Symbol.iterator](): IterableIterator<Value> {
    return this._set[Symbol.iterator]();
  }
}
