export class ImmutableSet<Value> {
  /**
   * @returns the number of (unique) elements in a ImmutableSet.
   */
  public readonly size: number;
  private _set: Set<Value>;
  constructor(iterable?: Iterable<Value> | null) {
    this._set = new Set(iterable);
    this.size = this._set.size;
  }
  /**
   * Creates a new ImmutableSet with the original items and appends a new element with a specified value
   * to the end of the new ImmutableSet
   */
  public add(value: Value): ImmutableSet<Value> {
    this._set.add(value);
    return new ImmutableSet(this);
  }
  /**
   * Returns a new empty ImmutableSet
   */
  public clear(): ImmutableSet<Value> {
    return new ImmutableSet();
  }
  /**
   * Creates a new ImmutableSet with the original items and removes a specified value from the new ImmutableSet.
   */
  public delete(value: Value): ImmutableSet<Value> {
    this._set.delete(value);
    return new ImmutableSet(this);
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
