import * as React from 'react';
import { makeMergeProps } from './makeMergeProps';

describe('mergeProps', () => {
  const basicMergeProps = makeMergeProps({ deepMerge: ['a', 'b', 'c', 'd', 'e', 'f'] });

  it('can merge objects', () => {
    expect(basicMergeProps({ a: 1, b: 1 }, { b: 2, c: 2 }, { c: 3, d: 3 })).toEqual({ a: 1, b: 2, c: 3, d: 3 });
  });

  it('can avoid deep merging for unexpected objects', () => {
    expect(basicMergeProps({ a: { foo: 1 } }, { a: { bar: 1 }, z: { foo: 1 } }, { z: { bar: 2 } })).toEqual({
      a: { foo: 1, bar: 1 },
      z: { bar: 2 },
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

  it('can ignore undefined values', () => {
    expect(basicMergeProps({}, { foo: {} }, { foo: undefined })).toEqual({ foo: {} });
  });

  it('does not ignore null values', () => {
    expect(basicMergeProps({ foo: {} }, { foo: null })).toEqual({ foo: null });
  });

  it('can merge classnames', () => {
    expect(basicMergeProps({ className: 'A' }, { className: 'B' }, { className: 'C D' })).toEqual({
      className: 'A B C D',
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
});
