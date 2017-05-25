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

  it('works if you pass less arguments on subsequent calls', () => {
    let count = 0;
    let func = memoize((
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
    let func = memoize((
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
    let func = memoize((
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
