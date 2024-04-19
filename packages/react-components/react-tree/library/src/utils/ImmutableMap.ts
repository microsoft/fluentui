export interface ImmutableMap<Key, Value> {
  clear(): ImmutableMap<Key, Value>;
  delete(key: Key): ImmutableMap<Key, Value>;
  /**
   * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
   * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
   */
  get(key: Key): Value | undefined;
  /**
   * @returns boolean indicating whether an element with the specified key exists or not.
   */
  has(key: Key): boolean;
  /**
   * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
   */
  set(key: Key, value: Value): ImmutableMap<Key, Value>;
  /**
   * @returns the number of elements in the Map.
   */
  readonly size: number;
  /** Iterates over entries in the Map. */
  [Symbol.iterator](): IterableIterator<[Key, Value]>;
  /**
   * @internal
   * Exposes the internal map used to store values.
   * This is an internal API and should not be used directly.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  dangerouslyGetInternalMap_unstable(): Map<Key, Value>;
}

const emptyImmutableMap = createImmutableMap<never, never>();

/**
 * properly creates an ImmutableMap instance from an iterable
 */
function createImmutableMap<Key, Value>(iterable?: Iterable<[Key, Value]>): ImmutableMap<Key, Value> {
  const internalMap = new Map(iterable);
  return dangerouslyCreateImmutableMap(internalMap);
}
/**
 * Avoid using *dangerouslyCreateImmutableMap*, since this method will expose internally used set, use  createImmutableMap instead,
 * @param internalMap - a set that is used internally to store values.
 */
function dangerouslyCreateImmutableMap<Key, Value>(internalMap: Map<Key, Value>): ImmutableMap<Key, Value> {
  return {
    size: internalMap.size,
    set: (key, value) => {
      const nextSet = new Map(internalMap);
      nextSet.set(key, value);
      return dangerouslyCreateImmutableMap(nextSet);
    },
    get: key => internalMap.get(key),
    clear: () => emptyImmutableMap,
    delete(value) {
      const nextSet = new Map(internalMap);
      nextSet.delete(value);
      return dangerouslyCreateImmutableMap(nextSet);
    },
    has: value => internalMap.has(value),
    [Symbol.iterator]: () => internalMap[Symbol.iterator](),
    // eslint-disable-next-line @typescript-eslint/naming-convention
    dangerouslyGetInternalMap_unstable: () => internalMap,
  };
}

function isImmutableMap<Key, Value>(value: unknown): value is ImmutableMap<Key, Value> {
  return typeof value === 'object' && value !== null && 'dangerouslyGetInternalMap_unstable' in value;
}

export const ImmutableMap = {
  empty: emptyImmutableMap,
  create: createImmutableMap,
  isImmutableMap,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  dangerouslyCreate_unstable: dangerouslyCreateImmutableMap,
};
