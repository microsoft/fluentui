import { ThemeClassNameContext } from '@fluentui/react-shared-contexts';
import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import { FluentProvider } from '@fluentui/react-provider';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { PortalCompatProvider } from './PortalCompatProvider';

describe('PortalCompatProvider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('registers a function in a context', () => {
    const { result } = renderHook(() => usePortalCompat(), { wrapper: PortalCompatProvider });

    expect(result.current).toBeInstanceOf(Function);
  });

  it('during register adds a className from "ThemeClassNameContext" context', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current(element)).toBeInstanceOf(Function);
    expect(element.classList.length).toBe(1);
    expect(element.classList.item(0)).toMatch(/fui-FluentProvider\d/);
  });

  it('during unregister remove a className from "ThemeClassNameContext" context', () => {
    const element = document.createElement('div');

    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });
    const unregister = result.current(element);

    expect(element.classList.length).toBe(1);
    expect(unregister).toBeInstanceOf(Function);

    expect(unregister()).toBeUndefined();
    expect(element.classList.length).toBe(0);
  });

  it('during register adds only proper className', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <ThemeClassNameContext.Provider value="foo bar baz">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </ThemeClassNameContext.Provider>
      ),
    });
    result.current(element);

    expect(element.classList.length).toBe(0);
  });
});
