import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useFluentProvider } from './useFluentProvider';
import { useFluentProviderContextValues } from './useFluentProviderContextValues';

describe('useAccordionContextValues', () => {
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

    expect(result.current.tooltip).toBeDefined();
  });

  it('should return a value for "theme"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({}, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(result.current.theme).toBeDefined();
  });

  it('should return a value for "themeClassname"', () => {
    const { result } = renderHook(() => {
      const state = useFluentProvider({}, React.createRef());

      return useFluentProviderContextValues(state);
    });

    expect(typeof result.current.themeClassname).toBe('string');
  });
});
