export interface Mappable<F> {
  fmap: <T>(fn: (v: F) => T) => Mappable<T>;
}
