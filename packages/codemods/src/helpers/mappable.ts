export interface Mappable<F> {
  /**
   * Takes in a lambda and applies that lambda and then returns the same type of mappable
   * that was started with.
   * @param fn: Lambda that takes a value of type F and maps that to a new value of type T
   */
  map: <T>(fn: (v: F) => T) => Mappable<T>;
}
