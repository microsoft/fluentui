import { getNativeProps, divProperties } from './properties';
import * as React from 'react';

describe('getNativeProps', () => {
  it('can pass through data tags', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        'data-automation-id': 1,
      },
      divProperties,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any)['data-automation-id']).toEqual(1);
  });

  it('can pass through aria tags', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
      {
        'aria-label': 1,
      },
      divProperties,
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any)['aria-label']).toEqual(1);
  });

  it('can pass through basic div properties and events', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(typeof (result as any).onClickCapture).toEqual('function');
  });

  it('can remove unexpected properties', () => {
    let result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result = getNativeProps<any>({ a: 1, b: 2 }, ['a', 'b'], ['b']);

    expect(result.a).toBeDefined();
    expect(result.b).toBeUndefined();
  });
});
