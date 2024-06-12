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
  /**
   * @internal
   * Exposes the internal set used to store values.
   * This is an internal API and should not be used directly.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  dangerouslyGetInternalSet_unstable(): Set<Value>;
}

const emptyImmutableSet = createImmutableSet<never>();

/**
 * Avoid using *dangerouslyCreateImmutableSet*, since this method will expose internally used set, use  createImmutableSet instead,
 * @param internalSet - a set that is used internally to store values.
 */
function dangerouslyCreateImmutableSet<Value>(internalSet: Set<Value>): ImmutableSet<Value> {
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
    // eslint-disable-next-line @typescript-eslint/naming-convention
    dangerouslyGetInternalSet_unstable: () => internalSet,
  };
}

function isImmutableSet<Value>(value: unknown): value is ImmutableSet<Value> {
  return typeof value === 'object' && value !== null && 'dangerouslyGetInternalSet_unstable' in value;
}

/**
 * properly creates an ImmutableSet instance from an iterable
 */
function createImmutableSet<Value>(iterable?: Iterable<Value>): ImmutableSet<Value> {
  const internalSet = new Set(iterable);
  return dangerouslyCreateImmutableSet(internalSet);
}

export const ImmutableSet = {
  empty: emptyImmutableSet,
  create: createImmutableSet,
  isImmutableSet,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  dangerouslyCreate_unstable: dangerouslyCreateImmutableSet,
};
