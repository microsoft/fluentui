import * as React from 'react';
import { mergeProps } from './mergeProps';

describe('mergeProps', () => {
  it('can merge objects', () => {
    expect(mergeProps({ a: 1, b: 1 }, { b: 2, c: 2 }, { c: 3, d: 3 })).toEqual({ a: 1, b: 2, c: 3, d: 3 });
  });

  it('can deep merge', () => {
    expect(
      mergeProps(
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
    expect(mergeProps({}, { foo: {} }, { foo: undefined })).toEqual({ foo: {} });
  });

  it('does not ignore null values', () => {
    expect(mergeProps({ foo: {} }, { foo: null })).toEqual({ foo: null });
  });

  it('can merge classnames', () => {
    expect(mergeProps({ className: 'A' }, { className: 'B' }, { className: 'C D' })).toEqual({ className: 'A B C D' });
  });

  it('can treat JSX as immutable', () => {
    expect(mergeProps({ as: <button /> }, { as: <div /> }, { as: <span /> })).toEqual({ as: <span /> });
  });

  it('can leave refs referentially intact', () => {
    const foo = React.createRef();

    expect(mergeProps({}, { ref: foo }).ref).toBe(foo);
  });

  it('can treat arrays as immutable', () => {
    expect(mergeProps({ items: [1, 2] }, { items: [3, 4] })).toEqual({ items: [3, 4] });
  });

  it('can treat functions as immutable', () => {
    const cb1 = () => undefined;
    const cb2 = () => undefined;

    expect(mergeProps({ callback: cb1 }, { callback: cb2 }).callback).toBe(cb2);
  });
});
