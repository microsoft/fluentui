import * as React from 'react';
import { mergeProps } from './mergeProps';
import * as PropTypes from 'prop-types';

describe('makeMergeProps', () => {
  it('gracefully handles undefined prop sets', () => {
    expect(() => mergeProps({}, undefined)).not.toThrow();
    expect(mergeProps({}, undefined)).toEqual({});
  });

  it('concats `className` removing extra whitespace', () => {
    expect(mergeProps({ className: ' a ' }, { className: ' b  c ' })).toEqual({ className: 'a b c' });
  });

  it('replaces JSX values and does not merge', () => {
    expect(mergeProps({}, { icon: <span data-one /> }, { icon: <span data-two /> })).toEqual({
      icon: <span data-two />,
    });
  });

  it('replaces ref object and does not merge', () => {
    const ref: React.MutableRefObject<{ foo: boolean } | null> = React.createRef();
    ref.current = { foo: true };

    const ref2: React.MutableRefObject<{ bar: boolean } | null> = React.createRef();
    ref2.current = { bar: true };

    expect(mergeProps({ ref }, { ref: ref2 })).toEqual({
      ref: {
        current: { bar: true },
      },
    });
  });

  it('handles merging PropTypes', () => {
    expect(mergeProps({}, { className: PropTypes.string })).toEqual({
      className: PropTypes.string,
    });
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

  describe('deep merging', () => {
    it('adds new keys to target', () => {
      expect(mergeProps({}, { deep: { newKey: true } })).toEqual({ deep: { newKey: true } });
    });

    it('can deep merge CSS in JS objects', () => {
      expect(
        mergeProps(
          {},
          {
            styles: { color: 'red' },
          },
          {
            styles: { ':hover': { color: 'blue' } },
          },
          {
            styles: { ':hover': { background: 'white' } },
          },
        ),
      ).toEqual({
        styles: {
          color: 'red',
          ':hover': {
            color: 'blue',
            background: 'white',
          },
        },
      });
    });
  });

  it('replaces string values', () => {
    expect(mergeProps({ str: 'a' }, { str: 'b' })).toEqual({ str: 'b' });
  });

  it('replaces number values', () => {
    expect(mergeProps({ num: 2 }, { num: 1 })).toEqual({ num: 1 });
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

  it('deeply merges shorthand props', () => {
    expect(
      mergeProps(
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
    const target = { bar: {} };
    const source = { bar: { foo: target.bar } };

    mergeProps(target, source);

    expect(true).toEqual(true);
  });
});
