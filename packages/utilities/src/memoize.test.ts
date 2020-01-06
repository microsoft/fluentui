import { memoize, memoizeFunction } from './memoize';

describe('memoizeFunction', () => {
  it('can return a cached result with a no args function', () => {
    let _timesCalled = 0;
    let memoizeFunctiondTimesCalled = memoizeFunction(() => ++_timesCalled);

    expect(memoizeFunctiondTimesCalled()).toEqual(1);
    expect(memoizeFunctiondTimesCalled()).toEqual(1);
  });

  it('can return a cached result with a 2 arg function', () => {
    let _timesCalled = 0;
    // tslint:disable-next-line:no-any
    let combine = memoizeFunction((obj1: any, obj2: any) => obj1.val + obj2.val + ++_timesCalled);
    let objA = { val: 'a' };
    let objB = { val: 'b' };

    expect(combine(objA, objA)).toEqual('aa1');
    expect(combine(objA, objA)).toEqual('aa1');
    expect(combine(objA, objB)).toEqual('ab2');
    expect(combine(objA, objB)).toEqual('ab2');
    expect(combine(objB, objA)).toEqual('ba3');
    expect(combine(objB, objA)).toEqual('ba3');
  });

  it('do not use a cached result if the function is different', () => {
    let _timesCalled = 0;
    let test = memoizeFunction((fn: Function) => {
      fn();
      return ++_timesCalled;
    });

    function createFunctionArg(): Function {
      return () => 'test';
    }

    let fnA = createFunctionArg();
    let fnB = createFunctionArg();

    expect(test(fnA)).toEqual(1);
    expect(test(fnA)).toEqual(1);
    expect(test(fnB)).toEqual(2);
    expect(test(fnA)).toEqual(1);
    expect(test(fnB)).toEqual(2);
    expect(test(fnB)).toEqual(2);
  });

  it('can return a cached result with falsy args', () => {
    let _timesCalled = 0;
    let combine = memoizeFunction(
      // tslint:disable-next-line:no-any
      (obj1: any, obj2: any) => (obj1 ? obj1.val : '') + (obj2 ? obj2.val : '') + ++_timesCalled
    );
    let objA = { val: 'a' };
    let objB = { val: 'b' };

    expect(combine(objA, objA)).toEqual('aa1');
    expect(combine(objA, undefined)).toEqual('a2');
    expect(combine(null, objB)).toEqual('b3');
    expect(combine(false, 0)).toEqual('4');
  });

  it('works if you pass less arguments on subsequent calls', () => {
    let count = 0;
    let func = memoizeFunction((a: string = '', b: string = '') => a + b + count++);

    expect(func('hi', 'world')).toEqual('hiworld0');
    expect(func('hi', 'world')).toEqual('hiworld0');
    expect(func('hi')).toEqual('hi1');
    expect(func('hi')).toEqual('hi1');
    expect(func()).toEqual('2');
    expect(func()).toEqual('2');
  });

  it('works if you pass more arguments on subsequent calls', () => {
    let count = 0;
    let func = memoizeFunction((a: string = '', b: string = '') => a + b + count++);

    expect(func()).toEqual('0');
    expect(func()).toEqual('0');
    expect(func('hi')).toEqual('hi1');
    expect(func('hi')).toEqual('hi1');
    expect(func('hi', 'world')).toEqual('hiworld2');
    expect(func('hi', 'world')).toEqual('hiworld2');
  });

  it('resets after resetCount limit is reached.', () => {
    let count = 0;
    let func = memoizeFunction((a: string) => a + count++, 1);

    expect(func('a')).toEqual('a0');
    expect(func('a')).toEqual('a0');
    expect(func('b')).toEqual('b1');
    expect(func('b')).toEqual('b2');
    expect(func('b')).toEqual('b2');
    expect(func('a')).toEqual('a3');
    expect(func('a')).toEqual('a4');
    expect(func('a')).toEqual('a4');
  });

  it('updates the cache if the cached value is null', () => {
    let returnFalseyValue = true;
    let falseyValue: null = null;
    let callback = (): number | null => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(1);
  });

  it('updates the cache if the cached value is undefined', () => {
    let returnFalseyValue = true;
    let falseyValue: undefined = undefined;
    let callback = (): number | undefined => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    returnFalseyValue = true;
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(1);
  });

  it('caches and preserves if the falsey value returned by the callback method is 0', () => {
    let returnFalseyValue = true;
    let falseyValue: number = 0;
    let callback = (): number => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    returnFalseyValue = true;
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(falseyValue);
  });

  it('caches and preserves if the falsey value returned by the callback method is NaN', () => {
    let returnFalseyValue = true;
    let falseyValue: number = NaN;
    let callback = (): number | null => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    returnFalseyValue = true;
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(falseyValue);
  });

  it('caches and preserves if the falsey value returned by the callback method is false', () => {
    let returnFalseyValue = true;
    let falseyValue: boolean = false;
    let callback = (): number | boolean => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    returnFalseyValue = true;
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(falseyValue);
  });

  it('caches and preserves if the falsey value returned by the callback method is empty string', () => {
    let returnFalseyValue = true;
    let falseyValue: string = '';
    let callback = (): number | string => {
      if (returnFalseyValue) {
        return falseyValue;
      }
      return 1;
    };
    let func = memoizeFunction(() => callback(), undefined, true /*ignoreNullOrUndefinedResult */);
    returnFalseyValue = true;
    expect(func()).toEqual(falseyValue);
    returnFalseyValue = false;
    expect(func()).toEqual(falseyValue);
  });
});

describe('memoize', () => {
  it('can work on multiple instances of a class', () => {
    let _count = 0;

    class Foo {
      @memoize
      public bar(val: string): string {
        return val + _count++;
      }
    }

    let f = new Foo();

    expect(f.bar('hi')).toEqual('hi0');
    expect(f.bar('hi')).toEqual('hi0');
    expect(f.bar('bye')).toEqual('bye1');
    expect(f.bar('bye')).toEqual('bye1');
  });
});
