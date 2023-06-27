/**
 * Creates a set from a given iterable, in case the iterable is a set itself, returns the given set instead.
 */
export function createSetFromIterable<V>(iterable: Iterable<V>): Set<V> {
  return iterable instanceof Set ? iterable : new Set(iterable);
}
