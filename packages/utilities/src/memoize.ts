import { Stylesheet } from '@uifabric/merge-styles';

const stylesheet = Stylesheet.getInstance();

if (stylesheet && stylesheet.onReset) {
  Stylesheet.getInstance().onReset(resetMemoizations);
}

// tslint:disable:no-any
declare class WeakMap {
  public get(key: any): any;
  public set(key: any, value: any): void;
  public has(key: any): boolean;
}

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
  target: any,
  key: string,
  descriptor: TypedPropertyDescriptor<T>
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
    }
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
 * @returns A memoized version of the function.
 */
export function memoizeFunction<T extends (...args: any[]) => RET_TYPE, RET_TYPE>(cb: T, maxCacheSize: number = 100): T {
  // Avoid breaking scenarios which don't have weak map.
  if (!_weakMap) {
    return cb;
  }

  let rootNode: any;
  let cacheSize = 0;
  let localResetCounter = _resetCounter;

  // tslint:disable-next-line:no-function-expression
  return function memoizedFunction(...args: any[]): RET_TYPE {
    let currentNode: any = rootNode;

    if (rootNode === undefined || localResetCounter !== _resetCounter || (maxCacheSize > 0 && cacheSize > maxCacheSize)) {
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

    return currentNode.value;
  } as any;
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
    map: _weakMap ? new _weakMap() : null
  };
}
