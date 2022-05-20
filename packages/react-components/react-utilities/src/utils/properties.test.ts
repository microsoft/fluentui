import { getNativeProps, divProperties } from './properties';

describe('getNativeProps', () => {
  it('can pass through data tags', () => {
    const result = getNativeProps(
      {
        'data-automation-id': 1,
      },
      divProperties as typeof divProperties & {
        'data-automation-id': 1;
      },
    );

    expect(result['data-automation-id']).toEqual(1);
  });

  it('can pass through aria tags', () => {
    const result = getNativeProps(
      {
        'aria-label': '1',
      },
      divProperties as typeof divProperties & {
        'aria-label': 1;
      },
    );

    expect(result['aria-label']).toEqual('1');
  });

  it('can pass through basic div properties and events', () => {
    //
    const result = getNativeProps(
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
    // @ts-expect-error -- foobar props was removed
    expect(result.foobar).toBeUndefined();
  });

  it('can exclude properties', () => {
    const result = getNativeProps({ a: 1, b: 2, c: 3 }, ['a', 'b'], ['b']);

    expect(result.a).toBeDefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(result.c).toBeUndefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(result.b).toBeUndefined();

    const resultObj = getNativeProps({ a: 1, b: 2, c: 3 }, { a: 1, b: 1 }, ['b']);

    expect(resultObj.a).toBeDefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(resultObj.c).toBeUndefined();
    // @ts-expect-error -- strict type checking for exclusion, b doesn't exist after removal
    expect(resultObj.b).toBeUndefined();
  });
});
