import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useFluentProvider_unstable } from './useFluentProvider';
import { useFluentProviderContextValues_unstable } from './useFluentProviderContextValues';

describe('useFluentProviderContextValues_unstable', () => {
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

  describe('themeClass (theming Phase 2b)', () => {
    it('always passes the RESOLVED theme class, independent of applyStylesToPortals', () => {
      const { result } = renderHook(() => {
        const state = {
          ...useFluentProvider_unstable({}, React.createRef()),
          root: { className: 'foo' },
          themeClassName: 'fui-theme-web-dark',
        };

        return useFluentProviderContextValues_unstable(state);
      });

      // v8 portal-compat consumes exactly this — never the full root class string.
      expect(result.current.themeClass).toBe('fui-theme-web-dark');
    });
  });
});
