import * as React from 'react';
import { makeMergeProps } from './makeMergeProps'

const mergeProps = makeMergeProps()

describe('mergeProps', () => {
  describe('merging same value type', () => {
    it('replaces strings with strings', () => {
      expect(mergeProps({ str: 'a' }, { str: 'b' })).toEqual({ str: 'b' });
    });

    it('replaces numbers with numbers', () => {
      expect(mergeProps({ num: 2 }, { num: 1 })).toEqual({ num: 1 });
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

    it('replaces arrays with arrays', () => {
      expect(mergeProps({ arr: ['a'] }, { arr: ['b'] })).toEqual({ arr: ['b'] });
    });

    describe('className', () => {
      it('is concatenated', () => {
        expect(mergeProps({ className: 'a' }, { className: 'b' })).toEqual({ className: 'a b' });
      });

      it('skips empty strings', () => {
        expect(mergeProps({ className: 'a' }, { className: '' })).toEqual({ className: 'a' });
        expect(mergeProps({ className: '' }, { className: 'b' })).toEqual({ className: 'b' });
      });

      it('skips whitespace only', () => {
        expect(mergeProps({ className: 'a' }, { className: '  ' })).toEqual({ className: 'a' });
        expect(mergeProps({ className: '  ' }, { className: 'b' })).toEqual({ className: 'b' });
      });

      it('trims extra whitespace around', () => {
        expect(mergeProps({ className: 'a' }, { className: '  space  ' })).toEqual({ className: 'a space' });
        expect(mergeProps({ className: '  space  ' }, { className: 'b' })).toEqual({ className: 'space b' });
      });

      it('trims extra whitespace within', () => {
        expect(mergeProps({ className: 'a  b' }, { className: 'c  d' })).toEqual({
          className: 'a b c d',
        });
      });
    });

    it('assigns `style`', () => {
      expect(
        mergeProps(
          {
            style: { color: 'red', lineHeight: 1 },
          },
          { style: { color: 'blue', fontWeight: 'bold' } },
        ),
      ).toEqual({
        style: { color: 'blue', lineHeight: 1, fontWeight: 'bold' },
      });
    });

    it('replaces JSX with JSX', () => {
      expect(
        mergeProps(
          {
            icon: <strong>first icon</strong>,
          },
          {
            icon: <div>second icon</div>,
          },
        ),
      ).toEqual({
        icon: <div>second icon</div>,
      });
    });

    it('replaces React refs with React refs', () => {
      expect('has a test').toEqual(true);
    });
  });

  describe('mismatched values', () => {
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
  });

  describe('recursion', () => {
    it('deeply merges props', () => {
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
      const target = { content: {} };
      const source = { content: { content: target.content } };
      mergeProps(target, source);

      expect(true).toEqual(true);
    });
  });
});
