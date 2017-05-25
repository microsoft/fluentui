// Polyfills
import 'es6-weak-map/implement';

import { memoize } from './memoize';

let { expect } = chai;

describe('memoize', () => {
  it('can return a cached result with a no args function', () => {
    let _timesCalled = 0;
    let memoizedTimesCalled = memoize(() => ++_timesCalled);

    expect(memoizedTimesCalled()).equals(1);
    expect(memoizedTimesCalled()).equals(1);
  });

  it('can return a cached result with a 2 arg function', () => {
    let _timesCalled = 0;
    let combine = memoize((obj1, obj2) => (obj1.val + obj2.val + ++_timesCalled));
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
    let combine = memoize((obj1, obj2) => ((obj1 ? obj1.val : '') + (obj2 ? obj2.val : '') + ++_timesCalled));
    let objA = { val: 'a' };
    let objB = { val: 'b' };

    expect(combine(objA, objA)).equals('aa1');
    expect(combine(objA, undefined)).equals('a2');
    expect(combine(null, objB)).equals('b3');
    expect(combine(false, 0)).equals('4');
  });

  it('throws if you pass different count of arguments', () => {
    let func = memoize((a?: string, b?: string) => true);

    expect(func('hi')).equals(true);

    let threw = false;
    try {
      func('hi', 'world');
    } catch (e) { threw = true; }

    expect(threw).equals(true);
  });
});
