import { Stylesheet } from '@fluentui/merge-styles';

/* eslint-disable @typescript-eslint/no-explicit-any */

declare class WeakMap {
  public get(key: any): any;
  public set(key: any, value: any): void;
  public has(key: any): boolean;
}

let _initializedStylesheetResets = false;
let _resetCounter = 0;
const _emptyObject = { empty: true };
const _dictionary: any = {};
let _weakMap = typeof WeakMap === 'undefined' ? null : WeakMap;

interface IMemoizeNode {
  map: WeakMap | null;
  value?: any;
}

/**
 *  Test utility for providing a custom weakmap.
 *
 * @internal
 * */
export function setMemoizeWeakMap(weakMap: any): void {
  _weakMap = weakMap;
}

/**
 * Reset memoizations.
 */
export function resetMemoizations(): void {
  _resetCounter++;
}

/**
 * Memoize decorator to be used on class methods. WARNING: the `this` reference
 * will be inaccessible within a memoized method, given that a cached method's `this`
 * would not be instance-specific.
 *
 * @public
 */
export function memoize<T extends Function>(
  _target: any,
  _key: string,
  descriptor: TypedPropertyDescriptor<T>,
): {
  configurable: boolean;
  get(): T;
} {
  // We bind to "null" to prevent people from inadvertently pulling values from "this",
  // rather than passing them in as input values which can be memoized.
  let fn = memoizeFunction(descriptor.value && descriptor.value.bind(null));

  return {
    configurable: true,
    get(): T {
      return fn;
    },
  };
}

/**
 * Memoizes a function; when you pass in the same parameters multiple times, it returns a cached result.
 * Be careful when passing in objects, you need to pass in the same INSTANCE for caching to work. Otherwise
 * it will grow the cache unnecessarily. Also avoid using default values that evaluate functions; passing in
 * undefined for a value and relying on a default function will execute it the first time, but will not
 * re-evaluate subsequent times which may have been unexpected.
 *
 * By default, the cache will reset after 100 permutations, to avoid abuse cases where the function is
 * unintendedly called with unique objects. Without a reset, the cache could grow infinitely, so we safeguard
 * by resetting. To override this behavior, pass a value of 0 to the maxCacheSize parameter.
 *
 * @public
 * @param cb - The function to memoize.
 * @param maxCacheSize - Max results to cache. If the cache exceeds this value, it will reset on the next call.
 * @param ignoreNullOrUndefinedResult - Flag to decide whether to cache callback result if it is undefined/null.
 * If the flag is set to true, the callback result is recomputed every time till the callback result is
 * not undefined/null for the first time, and then the non-undefined/null version gets cached.
 * @returns A memoized version of the function.
 */
export function memoizeFunction<T extends (...args: any[]) => RetType, RetType>(
  cb: T,
  maxCacheSize: number = 100,
  ignoreNullOrUndefinedResult: boolean = false,
): T {
  // Avoid breaking scenarios which don't have weak map.
  if (!_weakMap) {
    return cb;
  }

  if (!_initializedStylesheetResets) {
    const stylesheet = Stylesheet.getInstance();

    if (stylesheet && (stylesheet as { onReset?: unknown }).onReset) {
      Stylesheet.getInstance().onReset(resetMemoizations);
    }
    _initializedStylesheetResets = true;
  }

  let rootNode: any;
  let cacheSize = 0;
  let localResetCounter = _resetCounter;

  return function memoizedFunction(...args: any[]): RetType {
    let currentNode: any = rootNode;

    if (
      rootNode === undefined ||
      localResetCounter !== _resetCounter ||
      (maxCacheSize > 0 && cacheSize > maxCacheSize)
    ) {
      rootNode = _createNode();
      cacheSize = 0;
      localResetCounter = _resetCounter;
    }

    currentNode = rootNode;

    // Traverse the tree until we find the match.
    for (let i = 0; i < args.length; i++) {
      let arg = _normalizeArg(args[i]);

      if (!currentNode.map.has(arg)) {
        currentNode.map.set(arg, _createNode());
      }

      currentNode = currentNode.map.get(arg);
    }

    if (!currentNode.hasOwnProperty('value')) {
      currentNode.value = cb(...args);
      cacheSize++;
    }

    if (ignoreNullOrUndefinedResult && (currentNode.value === null || currentNode.value === undefined)) {
      currentNode.value = cb(...args);
    }

    return currentNode.value;
  } as any;
}

/**
 * Creates a memoizer for a single-value function, backed by a WeakMap.
 * With a WeakMap, the memoized values are only kept as long as the source objects,
 * ensuring that there is no memory leak.
 *
 * This function assumes that the input values passed to the wrapped function will be
 * `function` or `object` types. To memoize functions which accept other inputs, use
 * `memoizeFunction`, which memoizes against arbitrary inputs using a lookup cache.
 *
 * @public
 */
export function createMemoizer<F extends (input: any) => any>(getValue: F): F {
  if (!_weakMap) {
    // Without a `WeakMap` implementation, memoization is not possible.
    return getValue;
  }

  const cache = new _weakMap();

  function memoizedGetValue(input: any): any {
    if (!input || (typeof input !== 'function' && typeof input !== 'object')) {
      // A WeakMap can only be used to test against reference values, i.e. 'function' and 'object'.
      // All other inputs cannot be memoized against in this manner.
      return getValue(input);
    }

    if (cache.has(input)) {
      return cache.get(input)!;
    }

    const value = getValue(input);

    cache.set(input, value);

    return value;
  }

  return memoizedGetValue as F;
}

function _normalizeArg(val: null | undefined): { empty: boolean } | any;
function _normalizeArg(val: object): any;
function _normalizeArg(val: any): any {
  if (!val) {
    return _emptyObject;
  } else if (typeof val === 'object' || typeof val === 'function') {
    return val;
  } else if (!_dictionary[val]) {
    _dictionary[val] = { val };
  }

  return _dictionary[val];
}

function _createNode(): IMemoizeNode {
  return {
    map: _weakMap ? new _weakMap() : null,
  };
}
