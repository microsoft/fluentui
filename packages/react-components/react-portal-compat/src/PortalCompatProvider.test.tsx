import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import { FluentProvider } from '@fluentui/react-provider';
import { webDarkThemeClassName } from '@fluentui/react-theme';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { PortalCompatProvider, useProviderThemeClasses } from './PortalCompatProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('useProviderThemeClasses', () => {
  it('returns the resolved theme class of the closest FluentProvider', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider themeClassName={webDarkThemeClassName}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current).toEqual([webDarkThemeClassName]);
  });

  it('supports consumer-authored multi-class themeClassName values', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider themeClassName="my-theme my-theme-overrides">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current).toEqual(['my-theme', 'my-theme-overrides']);
  });

  it('returns the inherited class under a nested provider without a themeClassName', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider themeClassName={webDarkThemeClassName}>
          <FluentProvider dir="rtl">
            <PortalCompatProvider>{props.children}</PortalCompatProvider>
          </FluentProvider>
        </FluentProvider>
      ),
    });

    expect(result.current).toEqual([webDarkThemeClassName]);
  });

  it('returns no classes when the provider has no theme class (web-light :root defaults)', () => {
    jest.spyOn(console, 'warn').mockImplementation(noop);

    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current).toHaveLength(0);
  });

  it('logs a warning when does not have top level FluentProvider', () => {
    const warn = jest.fn().mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(warn);

    renderHook(() => useProviderThemeClasses(), { wrapper: PortalCompatProvider });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('PortalCompatProvider: no FluentProvider was found above in the React tree'),
    );
  });
});

describe('PortalCompatProvider', () => {
  it('registers a function in a context', () => {
    jest.spyOn(console, 'warn').mockImplementation(noop);

    const { result } = renderHook(() => usePortalCompat(), { wrapper: PortalCompatProvider });

    expect(result.current).toBeInstanceOf(Function);
  });

  it('during register adds the theme class to the element', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider themeClassName={webDarkThemeClassName}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current(element)).toBeInstanceOf(Function);
    expect(Array.from(element.classList)).toEqual([webDarkThemeClassName]);
  });

  it('during unregister removes the theme class from the element', () => {
    const element = document.createElement('div');

    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <FluentProvider themeClassName={webDarkThemeClassName}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });
    const unregister = result.current(element);

    expect(Array.from(element.classList)).toEqual([webDarkThemeClassName]);
    expect(unregister).toBeInstanceOf(Function);

    expect(unregister()).toBeUndefined();
    expect(element.classList.length).toBe(0);
  });
});
