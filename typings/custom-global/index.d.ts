// @TODO https://github.com/microsoft/fluentui/issues/20544
/// <reference path="../static-assets/index.d.ts" />
/// <reference path="../environment/index.d.ts" />

/**
 * Generic typings for sass files.
 */
declare module '*.scss' {
  const styles: { [className: string]: string };
  export default styles;
}

// These declarations are meant to represent the parts of Map/WeakMap/Set that exist in IE 11.
// Therefore, some functionality (such as constructor parameters) is intentionally missing.

/** Partial Map interface representing what's available in IE 11 */
declare interface Map<K, V> {
  readonly size: number;
  clear(): void;
  delete(key: K): boolean;
  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  /** WARNING: In IE 11, this method returns undefined rather than `this` */
  set(key: K, value: V): this;
}
declare interface MapConstructor {
  /** Map constructor. Does not accept parameters in IE 11. */
  new <K = any, V = any>(): Map<K, V>;
}
/** Partial Map constructor representing what's available in IE 11 */
declare var Map: MapConstructor;

/** Partial WeakMap interface representing what's available in IE 11 */
declare interface WeakMap<K extends object, V> {
  delete(key: K): boolean;
  get(key: K): V | undefined;
  has(key: K): boolean;
  /** WARNING: In IE 11, this method returns undefined rather than `this` */
  set(key: K, value: V): this;
}

declare interface WeakMapConstructor {
  /** WeakMap constructor. Does not accept parameters in IE 11. */
  new <K extends object = object, V = any>(): WeakMap<K, V>;
}
/** Partial WeakMap constructor representing what's available in IE 11 */
declare var WeakMap: WeakMapConstructor;

/** Partial Set interface representing what's available in IE 11 */
declare interface Set<T> {
  readonly size: number;
  /** WARNING: In IE 11, this method returns undefined rather than `this` */
  add(value: T): this;
  clear(): void;
  delete(value: T): boolean;
  forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
  has(value: T): boolean;
}

declare interface SetConstructor {
  /** Set constructor. Does not accept parameters in IE 11. */
  new <T = any>(): Set<T>;
}
/** Partial Set constructor representing what's available in IE 11 */
declare var Set: SetConstructor;
