import * as React from 'react';
import { getNativeProps, divProperties } from './properties';

describe('getNativeProps', () => {
  it('can pass through data tags', () => {
    const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        'data-automation-id': 1,
      },
      divProperties,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any)['data-automation-id']).toEqual(1);
  });

  it('can pass through aria tags', () => {
    const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        'aria-label': 1,
      },
      divProperties,
    );

    expect(result['aria-label']).toEqual(1);
  });

  it('can pass through basic div properties and events', () => {
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
    const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        foobar: 1,
        className: 'hi',
      },
      divProperties,
    );

    expect(result.className).toEqual('hi');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).foobar).toEqual(undefined);
  });

  it('can exclude properties', () => {
    const result = getNativeProps<{ a: number; b: number }>({ a: 1, b: 2 }, ['a', 'b'], ['b']);

    expect(result.a).toBeDefined();
    expect(result.b).toBeUndefined();
  });
});
