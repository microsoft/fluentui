import { ThemeClassNameProvider_unstable as ThemeClassNameProvider } from '@fluentui/react-shared-contexts';
import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import { FluentProvider } from '@fluentui/react-provider';
import { IdPrefixProvider, resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { PortalCompatProvider } from './PortalCompatProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

describe('PortalCompatProvider', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('registers a function in a context', () => {
    jest.spyOn(console, 'warn').mockImplementation(noop);

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
    expect(element.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "fui-FluentProvider1",
      }
    `);
  });

  it('during register adds a className from "ThemeClassNameContext" context with custom ID prefix', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <IdPrefixProvider value="custom1-">
          <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
            <PortalCompatProvider>{props.children}</PortalCompatProvider>
          </FluentProvider>
        </IdPrefixProvider>
      ),
    });

    expect(result.current(element)).toBeInstanceOf(Function);
    expect(element.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "custom1-fui-FluentProvider1",
      }
    `);
  });

  it('during register adds a className from "ThemeClassNameContext" context with a React 18 compatible ID', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <ThemeClassNameProvider value="fui-FluentProviderR1a">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </ThemeClassNameProvider>
      ),
    });

    expect(result.current(element)).toBeInstanceOf(Function);
    expect(element.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "fui-FluentProviderR1a",
      }
    `);
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

    expect(element.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "fui-FluentProvider1",
      }
    `);
    expect(unregister).toBeInstanceOf(Function);

    expect(unregister()).toBeUndefined();
    expect(element.classList.length).toBe(0);
  });

  it('during register adds only proper className', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: props => (
        <ThemeClassNameProvider value="foo bar baz">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </ThemeClassNameProvider>
      ),
    });
    result.current(element);

    expect(element.classList.length).toBe(0);
  });

  it('logs a warning when does not have top level FluentProvider', () => {
    const warn = jest.fn().mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(warn);

    renderHook(() => usePortalCompat(), { wrapper: PortalCompatProvider });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('PortalCompatProvider: "useThemeClassName()" hook returned an empty string'),
    );
  });
});
