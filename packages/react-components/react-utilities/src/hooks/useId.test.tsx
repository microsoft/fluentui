import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { IdPrefixProvider, resetIdsForTests, useId } from './useId';

describe('useId', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('uses prefix', () => {
    const { result } = renderHook(() => useId('foo'));

    expect(result.current).toBeDefined();
    expect(result.current).toMatch(/^foo/);
  });

  it('defaults to "fui-" when prefix is not specified', () => {
    const { result } = renderHook(() => useId());

    expect(result.current).toMatch(/^fui-/);
  });

  it('uses the same ID without prefix', () => {
    const { result, rerender } = renderHook(() => useId());
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('uses the same ID with prefix', () => {
    const { result, rerender } = renderHook(() => useId('foo'));
    const firstResult = result.current;

    rerender();

    expect(result.current).toBe(firstResult);
  });

  it('consumers prefix from a context', () => {
    const { result } = renderHook(() => useId(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <IdPrefixProvider value="scope-">{children}</IdPrefixProvider>
      ),
    });

    expect(result.current).toMatch(/^scope-fui-/);
  });
});

describe.each([false, true])('useId build namespace (native IDs enabled: %s)', nativeIds => {
  let namespaced: typeof import('./useId');

  function loadNamespace(value?: unknown) {
    if (value === undefined) {
      Reflect.deleteProperty(globalThis, '__FLUENT_USE_ID_BUILD_PREFIX__');
    } else {
      Object.defineProperty(globalThis, '__FLUENT_USE_ID_BUILD_PREFIX__', {
        configurable: true,
        value,
      });
    }

    jest.isolateModules(() => {
      jest.doMock('react', () => ({ ...React, useId: nativeIds ? React.useId : undefined }));
      namespaced = require('./useId');
    });
  }

  afterEach(() => {
    Reflect.deleteProperty(globalThis, '__FLUENT_USE_ID_BUILD_PREFIX__');
    jest.dontMock('react');
  });

  it.each([undefined, ''])('preserves the default when the namespace is %j', value => {
    loadNamespace(value);
    const { result } = renderHook(() => namespaced.useId());

    expect(result.current).toMatch(/^fui-/);
  });

  it.each(['app-a', '_app', 'App_2', 'undefined'])('prepends the namespace %s', value => {
    loadNamespace(value);
    const { result } = renderHook(() => namespaced.useId());

    expect(result.current).toMatch(new RegExp(`^${value}-fui-`));
  });

  it('composes with the nearest context and a custom hook prefix', () => {
    loadNamespace('app');
    const Provider = namespaced.IdPrefixProvider;
    const { result } = renderHook(() => namespaced.useId('field-'), {
      wrapper: ({ children }: { children?: React.ReactNode }) => (
        <Provider value="outer-">
          <Provider value="inner-">{children}</Provider>
        </Provider>
      ),
    });

    expect(result.current).toMatch(/^app-inner-field-/);
  });

  it('does not allow an empty provider prefix to erase the build namespace', () => {
    loadNamespace('app');
    const Provider = namespaced.IdPrefixProvider;
    const { result } = renderHook(() => namespaced.useId(), {
      wrapper: ({ children }: { children?: React.ReactNode }) => <Provider value="">{children}</Provider>,
    });

    expect(result.current).toMatch(/^app-fui-/);
  });

  it('preserves a caller-provided ID', () => {
    loadNamespace('app');
    const { result } = renderHook(() => namespaced.useId('field-', 'caller-id'));

    expect(result.current).toBe('caller-id');
  });

  it('still generates an ID for an empty caller-provided ID', () => {
    loadNamespace('app');
    const { result } = renderHook(() => namespaced.useId('field-', ''));

    expect(result.current).toMatch(/^app-field-/);
  });

  it('retains the resolved namespace and ID on rerenders', () => {
    loadNamespace('app');
    const { result, rerender } = renderHook(() => namespaced.useId());
    const firstId = result.current;
    Reflect.deleteProperty(globalThis, '__FLUENT_USE_ID_BUILD_PREFIX__');
    rerender();

    expect(result.current).toBe(firstId);
    expect(result.current).toMatch(/^app-fui-/);
  });

  it.each(['1app', 'app.name', 'app space', 'app:root', 'app\n', 1, null, false])(
    'logs invalid namespace %j outside production without throwing',
    value => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      try {
        expect(() => loadNamespace(value)).not.toThrow();
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(
          expect.stringContaining('__FLUENT_USE_ID_BUILD_PREFIX__ must be an empty string or match'),
        );
      } finally {
        errorSpy.mockRestore();
      }
    },
  );

  it('omits runtime namespace validation in production', () => {
    const nodeEnv = jest.replaceProperty(process.env, 'NODE_ENV', 'production');
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      expect(() => loadNamespace('invalid namespace')).not.toThrow();
      expect(errorSpy).not.toHaveBeenCalled();
    } finally {
      errorSpy.mockRestore();
      nodeEnv.restore();
    }
  });
});
