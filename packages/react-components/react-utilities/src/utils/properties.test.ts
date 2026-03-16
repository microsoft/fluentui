import * as React from 'react';
import { getNativeProps, divProperties, inputProperties, anchorProperties, buttonProperties } from './properties';

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

  it('can pass through input props', () => {
    const result = getNativeProps<React.InputHTMLAttributes<HTMLInputElement>>(
      {
        autoCapitalize: 'off',
        autoCorrect: 'on',
        maxLength: 10,
        minLength: 1,
        value: '123',
        // Non-input property
        foobar: 1,
      },
      inputProperties,
    );

    expect(result).toMatchObject({
      autoCapitalize: 'off',
      autoCorrect: 'on',
      maxLength: 10,
      minLength: 1,
      value: '123',
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).foobar).toBeUndefined();
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

  it('can pass through anchor props including referrerPolicy', () => {
    const result = getNativeProps<React.AnchorHTMLAttributes<HTMLAnchorElement>>(
      {
        href: 'https://www.bing.com',
        target: '_blank',
        referrerPolicy: 'no-referrer',
        download: 'file.txt',
        // Non-anchor property
        foobar: 1,
      },
      anchorProperties,
    );

    expect(result).toMatchObject({
      href: 'https://www.bing.com',
      target: '_blank',
      referrerPolicy: 'no-referrer',
      download: 'file.txt',
    });

    expect(result).not.toHaveProperty('foobar');
  });

  describe('popover', () => {
    it('allows the popoverTarget attribute on button', () => {
      const result = getNativeProps<React.HTMLAttributes<HTMLButtonElement>>(
        {
          popoverTarget: 'some-id',
        },
        buttonProperties,
      );

      expect(result.popoverTarget).toEqual('some-id');
    });

    it('allows the popover attribute on divs', () => {
      const result = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(
        {
          popover: 'auto',
          popoverTarget: 'some-id',
        },
        divProperties,
      );

      expect(result.popover).toEqual('auto');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((result as any).popoverTarget).toEqual(undefined);
    });
  });
});
