import * as React from 'react';
import { makeMergeProps } from './makeMergeProps';

describe('makeMergeProps', () => {
  const mergeProps = makeMergeProps();

  it('gracefully handles undefined prop sets', () => {
    expect(() => mergeProps({}, undefined)).not.toThrow();
  });

  it('concats `className` removing extra whitespace', () => {
    expect(mergeProps({ className: ' a ' }, { className: ' b  c ' })).toEqual({ className: 'a b c' });
  });

  it('merges `style` by default', () => {
    expect(
      mergeProps(
        {
          style: { color: 'red', lineHeight: 1 },
        },
        {
          style: { color: 'blue', fontWeight: 'bold' },
        },
      ),
    ).toEqual({
      style: { color: 'blue', lineHeight: 1, fontWeight: 'bold' },
    });
  });

  it('does not deep merge by default', () => {
    expect(mergeProps({}, { unexpected: { foo: 1 } }, { unexpected: { bar: 1 } })).toEqual({
      unexpected: { bar: 1 },
    });
  });

  it('can deep merge', () => {
    const deepMergeProps = makeMergeProps({ deepMerge: ['a', 'b', 'f'] });
    expect(
      deepMergeProps(
        {
          a: {
            b: {
              c: 1,
              d: 'test',
              e: true,
              className: 'hello',
              style: { color: 'red' },
            },
          },
        },
        {
          a: {
            b: {
              c: 0,
              f: 'f',
              className: 'world',
              style: { background: 'black' },
            },
          },
        },
      ),
    ).toEqual({
      a: {
        b: {
          c: 0,
          d: 'test',
          e: true,
          f: 'f',
          className: 'hello world',
          style: { color: 'red', background: 'black' },
        },
      },
    });
  });

  it('replaces strings with strings', () => {
    expect(mergeProps({ str: 'a' }, { str: 'b' })).toEqual({ str: 'b' });
  });

  it('replaces numbers with numbers', () => {
    expect(mergeProps({ num: 2 }, { num: 1 })).toEqual({ num: 1 });
  });

  it('replaces JSX values', () => {
    expect(mergeProps({ as: <button /> }, { as: <div /> }, { as: <span /> })).toEqual({ as: <span /> });
  });

  it('replaces array values', () => {
    expect(mergeProps({ items: [1, 2] }, { items: [3, 4] })).toEqual({ items: [3, 4] });
  });

  it('replaces function values', () => {
    const cb1 = () => undefined;
    const cb2 = () => undefined;

    expect(mergeProps({ callback: cb1 }, { callback: cb2 }).callback).toBe(cb2);
  });

  it('replaces truthy values with falsy values', () => {
    const truthy = {
      num: 9,
      str: 'hi',
      arr: ['stuff'],
      bool: true,
      undef: 'not undefined',
      nil: 'not null',
      arrNum: [9],
      arrStr: ['hi'],
      arrArr: [['stuff']],
      arrBool: [true],
      arrUndef: ['not undefined'],
      arrNil: ['not null'],
    };

    const falsy = {
      num: 0,
      str: '',
      arr: [],
      bool: false,
      undef: undefined,
      nil: null,
      arrNum: [0],
      arrStr: [''],
      arrArr: [[]],
      arrBool: [false],
      arrUndef: [undefined],
      arrNil: [null],
    };

    expect(mergeProps(truthy, falsy)).toEqual(falsy);
  });

  it('replaces falsy values with truthy values', () => {
    const truthy = {
      num: 9,
      str: 'hi',
      arr: ['stuff'],
      bool: true,
      undef: 'not undefined',
      nil: 'not null',
      arrNum: [9],
      arrStr: ['hi'],
      arrArr: [['stuff']],
      arrBool: [true],
      arrUndef: ['not undefined'],
      arrNil: ['not null'],
    };

    const falsy = {
      num: 0,
      str: '',
      arr: [],
      bool: false,
      undef: undefined,
      nil: null,
      arrNum: [0],
      arrStr: [''],
      arrArr: [[]],
      arrBool: [false],
      arrUndef: [undefined],
      arrNil: [null],
    };

    expect(mergeProps(falsy, truthy)).toEqual(truthy);
  });

  it('replaces null with literals', () => {
    expect(mergeProps({ a: null }, { a: 0 })).toEqual({ a: 0 });
    expect(mergeProps({ a: null }, { a: 1 })).toEqual({ a: 1 });
    expect(mergeProps({ a: null }, { a: 'a' })).toEqual({ a: 'a' });
  });

  it('replaces literals with null', () => {
    expect(mergeProps({ a: 0 }, { a: null })).toEqual({ a: null });
    expect(mergeProps({ a: 1 }, { a: null })).toEqual({ a: null });
    expect(mergeProps({ a: 'a' }, { a: null })).toEqual({ a: null });
  });

  describe('recursion', () => {
    it('replaces string values by default', () => {
      expect(mergeProps({ replace: 'one' }, { replace: 'two' })).toEqual({
        replace: 'two',
      });
    });

    it('deeply merges props in options.deepMerge', () => {
      const mergeIconProps = makeMergeProps({ deepMerge: ['icon'] });

      expect(
        mergeIconProps(
          {
            icon: { size: 'small', className: 'a', style: { color: 'blue', lineHeight: 1 } },
          },
          {
            icon: { size: 'large', className: 'b', style: { color: 'red', fontWeight: 'bold' } },
          },
        ),
      ).toEqual({
        icon: { size: 'large', className: 'a b', style: { color: 'red', lineHeight: 1, fontWeight: 'bold' } },
      });
    });

    it('avoids infinite loops when source references target props', () => {
      const target = { content: {} };
      const source = { content: { content: target.content } };

      mergeProps(target, source);

      expect(true).toEqual(true);
    });
  });
});
