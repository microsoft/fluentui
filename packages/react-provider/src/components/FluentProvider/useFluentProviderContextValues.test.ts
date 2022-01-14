import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useFluentProvider } from './useFluentProvider';
import { useFluentProviderContextValues } from './useFluentProviderContextValues';

describe('useFluentProviderContextValues', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  it('should return a value for "provider"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({}, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.provider).toBeDefined();
    expect(result.current.provider.dir).toBe('ltr');
    expect(result.current.provider.targetDocument).toBe(document);
  });

  it('should return a value for "tooltip"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({}, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.tooltip).toEqual({});
  });

  it('should return undefined if "theme" is not set', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({}, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.theme).toBe(undefined);
  });

  it('should return a value for "theme"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({ theme: { colorBrandBackground: '#fff' } }, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.theme).toEqual({ colorBrandBackground: '#fff' });
  });

  it('should return a value for "themeClassname"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({ className: 'foo' }, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.themeClassName).toBe('foo');
  });
});
