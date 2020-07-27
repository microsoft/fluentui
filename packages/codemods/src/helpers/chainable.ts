import { Mappable } from './mappable';

export type Flattened<T, V> = T extends Chainable<unknown> ? T : V;
export interface Chainable<T> extends Mappable<T> {
  flatten: () => Flattened<T, Chainable<T>>;
  chain: <R>(fn: (v: T) => Chainable<R>) => Chainable<R>;
  then: <R>(fn: (v: T) => R) => Chainable<R>;
}
