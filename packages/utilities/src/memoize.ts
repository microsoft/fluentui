import 'es6-weak-map/implement';

declare class WeakMap {
  public get(key: any): any;
  public set(key: any, value: any): void;
  public has(key: any);
}

const _emptyObject = {};
const _dictionary = {};

function _normalizeArg(val: any) {
  if (!val) {
    return _emptyObject;
  } else if (typeof val === 'object') {
    return val;
  } else if (!_dictionary[val]) {
    _dictionary[val] = {};
  }

  return _dictionary[val];
}

export function memoize<T extends (...args: any[]) => RET_TYPE, RET_TYPE>(cb: T): T {
  let cache: any;

  // tslint:disable-next-line:no-function-expression
  return function memoizedFunction(...args: any[]): RET_TYPE {
    let retVal: RET_TYPE;

    if (args.length === 0) {
      if (cache === undefined) {
        cache = cb(...args);
      }
      retVal = cache;
    } else {
      if (!cache) {
        cache = new WeakMap();
      }

      let currentCache: any = cache;

      for (let i = 0; i < args.length - 1; i++) {
        let arg = _normalizeArg(args[i]);

        if (!arg) {
          arg = _emptyObject;
        }
        if (cache.has(arg)) {
          currentCache = cache.get(arg);
        } else {
          currentCache = new WeakMap();
          cache.set(arg, currentCache);
        }
      }

      let lastArg = _normalizeArg(args[args.length - 1]);

      if (currentCache.has(lastArg)) {
        retVal = currentCache.get(lastArg);
      } else {
        let value = cb(...args);
        currentCache.set(lastArg, value);
        retVal = value;
      }
    }

    return retVal;
  } as any;
}
