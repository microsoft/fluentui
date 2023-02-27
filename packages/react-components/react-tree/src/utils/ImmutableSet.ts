export interface ImmutableSet<Value> {
  /**
   * The number of (unique) elements in a ImmutableSet.
   */
  readonly size: number;
  /**
   * Creates a new ImmutableSet containing all previous element plus the one provided as argument
   * @param value - new value to be included in the new ImmutableSet instance
   */
  add(value: Value): ImmutableSet<Value>;
  /**
   * Returns a reference to ImmutableSet.emptySet
   */
  clear(): ImmutableSet<Value>;
  /**
   * Creates a new ImmutableSet with the original items and removes a specified value from the new ImmutableSet.
   */
  delete(value: Value): ImmutableSet<Value>;
  /**
   * @returns a boolean indicating whether an element with the specified value exists in the ImmutableSet or not.
   */
  has(value: Value): boolean;
  /** Iterates over values in the ImmutableSet. */
  [Symbol.iterator](): IterableIterator<Value>;
}

export const emptyImmutableSet = createImmutableSet<never>();

/**
 * properly creates an ImmutableSet instance from an iterable
 */
export function createImmutableSet<Value>(iterable?: Iterable<Value>): ImmutableSet<Value> {
  const internalSet = new Set(iterable);
  return dangerouslyCreateImmutableSet(internalSet);
}
/**
 * Avoid using *dangerouslyCreateImmutableSet*, since this method will expose internally used set, use  createImmutableSet instead,
 * @param internalSet - a set that is used internally to store values.
 */
export function dangerouslyCreateImmutableSet<Value>(internalSet: Set<Value>): ImmutableSet<Value> {
  return {
    size: internalSet.size,
    add(value) {
      const nextSet = new Set(internalSet);
      nextSet.add(value);
      return dangerouslyCreateImmutableSet(nextSet);
    },
    clear() {
      return emptyImmutableSet;
    },
    delete(value) {
      const nextSet = new Set(internalSet);
      nextSet.delete(value);
      return dangerouslyCreateImmutableSet(nextSet);
    },
    has(value) {
      return internalSet.has(value);
    },
    [Symbol.iterator]() {
      return internalSet[Symbol.iterator]();
    },
  };
}
