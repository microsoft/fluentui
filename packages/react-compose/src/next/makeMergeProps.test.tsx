import * as React from 'react';
import { makeMergeProps } from './makeMergeProps';

describe('makeMergeProps', () => {
  const basicMergeProps = makeMergeProps({ deepMerge: ['a', 'b', 'c', 'd', 'e', 'f'] });

  it('can merge objects', () => {
    expect(basicMergeProps({ a: 1, b: 1 }, { b: 2, c: 2 }, { c: 3, d: 3 })).toEqual({ a: 1, b: 2, c: 3, d: 3 });
  });

  it('can avoid deep merging for unexpected objects', () => {
    expect(basicMergeProps({}, { unexpected: { foo: 1 } }, { unexpected: { bar: 1 } })).toEqual({
      unexpected: { bar: 1 },
    });
  });

  it('always deep merges the style prop', () => {
    expect(basicMergeProps({ style: { background: 'red' } }, { style: { color: 'green' } })).toEqual({
      style: { background: 'red', color: 'green' },
    });
  });

  it('can deep merge', () => {
    expect(
      basicMergeProps(
        {
          a: {
            b: {
              c: 1,
              d: 'test',
              e: true,
            },
            f: {
              className: 'hello',
            },
          },
        },
        {
          a: {
            b: {
              c: 0,
              f: 'f',
            },
            f: {
              className: 'world',
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
        },
        f: {
          className: 'hello world',
        },
      },
    });
  });

  it('can treat JSX as immutable', () => {
    expect(basicMergeProps({ as: <button /> }, { as: <div /> }, { as: <span /> })).toEqual({ as: <span /> });
  });

  it('can leave refs referentially intact', () => {
    const foo = React.createRef();

    expect(basicMergeProps({}, { ref: foo }).ref).toBe(foo);
  });

  it('can treat arrays as immutable', () => {
    expect(basicMergeProps({ items: [1, 2] }, { items: [3, 4] })).toEqual({ items: [3, 4] });
  });

  it('can treat functions as immutable', () => {
    const cb1 = () => undefined;
    const cb2 = () => undefined;

    expect(basicMergeProps({ callback: cb1 }, { callback: cb2 }).callback).toBe(cb2);
  });

  describe('merging same value type', () => {
    it('replaces strings with strings', () => {
      expect(basicMergeProps({ str: 'a' }, { str: 'b' })).toEqual({ str: 'b' });
    });

    it('replaces numbers with numbers', () => {
      expect(basicMergeProps({ num: 2 }, { num: 1 })).toEqual({ num: 1 });
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

      expect(basicMergeProps(truthy, falsy)).toEqual(falsy);
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

      expect(basicMergeProps(falsy, truthy)).toEqual(truthy);
    });

    it('replaces arrays with arrays', () => {
      expect(basicMergeProps({ arr: ['a'] }, { arr: ['b'] })).toEqual({ arr: ['b'] });
    });

    describe('className', () => {
      it('is concatenated', () => {
        expect(basicMergeProps({ className: 'a' }, { className: 'b' })).toEqual({ className: 'a b' });
      });

      it('skips empty strings', () => {
        expect(basicMergeProps({ className: 'a' }, { className: '' })).toEqual({ className: 'a' });
        expect(basicMergeProps({ className: '' }, { className: 'b' })).toEqual({ className: 'b' });
      });

      it('skips whitespace only', () => {
        expect(basicMergeProps({ className: 'a' }, { className: '  ' })).toEqual({ className: 'a' });
        expect(basicMergeProps({ className: '  ' }, { className: 'b' })).toEqual({ className: 'b' });
      });

      it('trims extra whitespace around', () => {
        expect(basicMergeProps({ className: 'a' }, { className: '  space  ' })).toEqual({ className: 'a space' });
        expect(basicMergeProps({ className: '  space  ' }, { className: 'b' })).toEqual({ className: 'space b' });
      });

      it('trims extra whitespace within', () => {
        expect(basicMergeProps({ className: 'a  b' }, { className: 'c  d' })).toEqual({
          className: 'a b c d',
        });
      });
    });

    it('assigns `style`', () => {
      expect(
        basicMergeProps(
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
        basicMergeProps(
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

    // it('replaces React refs with React refs', () => {
    //   expect('has a test').toEqual(true);
    // });
  });

  describe('mismatched values', () => {
    it('replaces null with literals', () => {
      expect(basicMergeProps({ a: null }, { a: 0 })).toEqual({ a: 0 });
      expect(basicMergeProps({ a: null }, { a: 1 })).toEqual({ a: 1 });
      expect(basicMergeProps({ a: null }, { a: 'a' })).toEqual({ a: 'a' });
    });

    it('replaces literals with null', () => {
      expect(basicMergeProps({ a: 0 }, { a: null })).toEqual({ a: null });
      expect(basicMergeProps({ a: 1 }, { a: null })).toEqual({ a: null });
      expect(basicMergeProps({ a: 'a' }, { a: null })).toEqual({ a: null });
    });
  });

  describe('recursion', () => {
    const mergeIconProps = makeMergeProps({ deepMerge: ['icon'] });
    it('deeply merges props', () => {
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

    // it('avoids infinite loops when source references target props', () => {
    //   const target = { content: {} };
    //   const source = { content: { content: target.content } };
    //
    //   basicMergeProps(target, source);
    //
    //   expect(true).toEqual(true);
    // });
  });
});
