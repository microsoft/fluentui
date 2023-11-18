import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useFluentProvider_unstable } from './useFluentProvider';
import { useFluentProviderContextValues_unstable } from './useFluentProviderContextValues';

describe('useFluentProviderContextValues_unstable', () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const noop = () => {};

  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(noop);
  });

  it('should return a value for "provider"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider_unstable({}, React.createRef());

      return useFluentProviderContextValues_unstable(state);
    });

    expect(result.current.provider).toBeDefined();
    expect(result.current.provider.dir).toBe('ltr');
    expect(result.current.provider.targetDocument).toBe(document);
  });

  it('should return a value for "tooltip"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider_unstable({}, React.createRef());

      return useFluentProviderContextValues_unstable(state);
    });

    expect(result.current.tooltip).toEqual({});
  });

  it('should return undefined if "theme" is not set', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider_unstable({}, React.createRef());

      return useFluentProviderContextValues_unstable(state);
    });

    expect(result.current.theme).toBe(undefined);
  });

  it('should return a value for "theme"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider_unstable({ theme: { colorBrandBackground: '#fff' } }, React.createRef());

      return useFluentProviderContextValues_unstable(state);
    });

    expect(result.current.theme).toEqual({ colorBrandBackground: '#fff' });
  });

  describe('themeClassname', () => {
    it('passes classes from "root" slot by default', () => {
      const { result } = renderHook(() => {
        const state = {
          ...useFluentProvider_unstable({}, React.createRef()),
          root: { className: 'foo' },
          themeClassName: 'bar',
        };

        return useFluentProviderContextValues_unstable(state);
      });

      expect(result.current.themeClassName).toBe('foo');
    });

    it('passes classes only from "themeClassName" when "applyStylesToPortals" is false', () => {
      const { result } = renderHook(() => {
        const state = {
          ...useFluentProvider_unstable({}, React.createRef()),
          applyStylesToPortals: false,
          root: { className: 'foo' },
          themeClassName: 'bar',
        };

        return useFluentProviderContextValues_unstable(state);
      });

      expect(result.current.themeClassName).toBe('bar');
    });
  });
});
