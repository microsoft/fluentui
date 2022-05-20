import * as React from 'react';
import { getNativeProps, divProperties } from './properties';

describe('getNativeProps', () => {
  it('can pass through data tags', () => {
    const result = getNativeProps(
      {
        'data-automation-id': 1,
      },
      divProperties,
    );

    expect(result['data-automation-id']).toEqual(1);
  });

  it('can pass through aria tags', () => {
    const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        'aria-label': '1',
      },
      divProperties,
    );

    expect(result['aria-label']).toEqual('1');
  });

  it('can pass through basic div properties and events', () => {
    //
    const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        className: 'foo',
        onClick: () => {
          /* no-op */
        },
        onClickCapture: () => {
          /* no-op */
        },
      },
      divProperties,
    );

    expect(result.className).toEqual('foo');
    expect(typeof result.onClick).toEqual('function');
    expect(typeof result.onClickCapture).toEqual('function');
  });

  it('can remove unexpected properties', () => {
    const result = getNativeProps(
      {
        foobar: 1,
        className: 'hi',
      },
      divProperties,
    );

    expect(result.className).toEqual('hi');
    expect(result.foobar).toEqual(undefined);
  });

  it('can exclude properties', () => {
    const result = getNativeProps({ a: 1, b: 2 }, ['a', 'b'], ['b']);

    expect(result.a).toBeDefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(result.b).toBeUndefined();

    const resultObj = getNativeProps({ a: 1, b: 2 }, { a: 1, b: 1 }, ['b']);

    expect(resultObj.a).toBeDefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(resultObj.b).toBeUndefined();
  });
});
