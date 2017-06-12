import { memoize, memoizeFunction, setMemoizeWeakMap } from './memoize';
import weakMapPolyfill = require('es6-weak-map');

let { expect } = chai;

describe('memoizeFunction', () => {
  before(() => {
    setMemoizeWeakMap(weakMapPolyfill);
  });

  after(() => {
    setMemoizeWeakMap(undefined);
  });

  it('can return a cached result with a no args function', () => {
    let _timesCalled = 0;
    let memoizeFunctiondTimesCalled = memoizeFunction(() => ++_timesCalled);

    expect(memoizeFunctiondTimesCalled()).equals(1);
    expect(memoizeFunctiondTimesCalled()).equals(1);
  });

  it('can return a cached result with a 2 arg function', () => {
    let _timesCalled = 0;
    let combine = memoizeFunction((obj1, obj2) => (obj1.val + obj2.val + ++_timesCalled));
    let objA = { val: 'a' };
    let objB = { val: 'b' };

    expect(combine(objA, objA)).equals('aa1');
    expect(combine(objA, objA)).equals('aa1');
    expect(combine(objA, objB)).equals('ab2');
    expect(combine(objA, objB)).equals('ab2');
    expect(combine(objB, objA)).equals('ba3');
    expect(combine(objB, objA)).equals('ba3');
  });

  it('can return a cached result with falsy args', () => {
    let _timesCalled = 0;
    let combine = memoizeFunction((obj1, obj2) => ((obj1 ? obj1.val : '') + (obj2 ? obj2.val : '') + ++_timesCalled));
    let objA = { val: 'a' };
    let objB = { val: 'b' };

    expect(combine(objA, objA)).equals('aa1');
    expect(combine(objA, undefined)).equals('a2');
    expect(combine(null, objB)).equals('b3');
    expect(combine(false, 0)).equals('4');
  });

  it('works if you pass less arguments on subsequent calls', () => {
    let count = 0;
    let func = memoizeFunction((
      a: string = '',
      b: string = ''
    ) => a + b + count++);

    expect(func('hi', 'world')).equals('hiworld0');
    expect(func('hi', 'world')).equals('hiworld0');
    expect(func('hi')).equals('hi1');
    expect(func('hi')).equals('hi1');
    expect(func()).equals('2');
    expect(func()).equals('2');
  });

  it('works if you pass more arguments on subsequent calls', () => {
    let count = 0;
    let func = memoizeFunction((
      a: string = '',
      b: string = ''
    ) => a + b + count++);

    expect(func()).equals('0');
    expect(func()).equals('0');
    expect(func('hi')).equals('hi1');
    expect(func('hi')).equals('hi1');
    expect(func('hi', 'world')).equals('hiworld2');
    expect(func('hi', 'world')).equals('hiworld2');
  });

  it('resets after resetCount limit is reached.', () => {
    let count = 0;
    let func = memoizeFunction((
      a: string
    ) => a + count++, 1);

    expect(func('a')).equals('a0');
    expect(func('a')).equals('a0');
    expect(func('b')).equals('b1');
    expect(func('b')).equals('b2');
    expect(func('b')).equals('b2');
    expect(func('a')).equals('a3');
    expect(func('a')).equals('a4');
    expect(func('a')).equals('a4');
  });

});

describe('memoize', () => {
  before(() => {
    setMemoizeWeakMap(weakMapPolyfill);
  });

  after(() => {
    setMemoizeWeakMap(undefined);
  });

  it('can work on multiple instances of a class', () => {
    let _count = 0;

    class Foo {

      @memoize
      public bar(val: string) {
        return val + _count++;
      }
    }

    let f = new Foo();

    expect(f.bar('hi')).equals('hi0');
    expect(f.bar('hi')).equals('hi0');
    expect(f.bar('bye')).equals('bye1');
    expect(f.bar('bye')).equals('bye1');
  });

});

describe('memoizeFunctionWithoutPolyfill', () => {
  it('passes through function without polyfill', () => {
    let count = 0;
    let func = memoizeFunction((
      a: string
    ) => a + count++, 1);

    expect(func('a')).equals('a0');
    expect(func('a')).equals('a1');
    expect(func('a')).equals('a2');
  });
});
