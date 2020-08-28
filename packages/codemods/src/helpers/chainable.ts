export type Flattened<T, V> = T extends Chainable<unknown> ? T : V;
export interface Chainable<T> {
  /**
   * If this Chainables's T is an instance of Chainable,
   * then it will flatten it so now Chainable now contains
   * a value of whatever type T held
   * Chainable<Chainable<T>> => Chainable<T>
   */
  flatten: () => Flattened<T, Chainable<T>>;

  /**
   * This takes in a lambda which maps from the current chainable
   * type to the same type of chainable with a new type R. The entire function then returns
   * a new Chainable with type R
   * @param fn: A lambda that maps from a type T and returns a new Chainable that has type R.
   */
  chain: <R>(fn: (v: T) => Chainable<R>) => Chainable<R>;

  /**
   * A combination of chain, map, and flatten. Then can return either type R or
   * Chainable<R> and this value will get flattened appropriately so the
   * returned Chainable is not nested.
   * @param fn: A lambda that maps from a type T and returns a new type R.
   */
  then: <R>(fn: (v: T) => R) => Chainable<R>;
}
