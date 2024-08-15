import { ThemeClassNameProvider_unstable as ThemeClassNameProvider } from '@fluentui/react-shared-contexts';
import { usePortalCompat } from '@fluentui/react-portal-compat-context';
import { FluentProvider, useFluentProviderThemeStyleTag } from '@fluentui/react-provider';
import { IdPrefixProvider, resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { PortalCompatProvider, useProviderThemeClasses } from './PortalCompatProvider';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

const TestWrapperWithMultipleClasses: React.FC = props => {
  // Creates a second className with CSS variables
  const { styleTagId } = useFluentProviderThemeStyleTag({
    theme: { borderRadiusCircular: '50px' },
    targetDocument: document,
    rendererAttributes: {},
  });

  return (
    <FluentProvider className={styleTagId} theme={{ colorNeutralBackground1: '#ccc' }}>
      <PortalCompatProvider>{props.children}</PortalCompatProvider>
    </FluentProvider>
  );
};

describe('useProviderThemeClasses', () => {
  afterEach(() => {
    resetIdsForTests();
  });

  it('handles classes from FluentProvider', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: props => (
        <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </FluentProvider>
      ),
    });

    expect(result.current).toMatchInlineSnapshot(`
      Array [
        "fui-FluentProvider1",
      ]
    `);
  });

  it('handles multiple classes from FluentProvider', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: TestWrapperWithMultipleClasses,
    });

    expect(result.current).toMatchInlineSnapshot(`
      Array [
        "fui-FluentProvider2",
        "fui-FluentProvider1",
      ]
    `);
  });

  it('handles classes with custom ID prefix', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: props => (
        <IdPrefixProvider value="custom1-">
          <FluentProvider theme={{ colorNeutralBackground1: '#ccc' }}>
            <PortalCompatProvider>{props.children}</PortalCompatProvider>
          </FluentProvider>
        </IdPrefixProvider>
      ),
    });

    expect(result.current).toMatchInlineSnapshot(`
      Array [
        "custom1-fui-FluentProvider1",
      ]
    `);
  });

  it('handles classes with a React 18 compatible ID', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: props => (
        <ThemeClassNameProvider value="fui-FluentProviderR1a">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </ThemeClassNameProvider>
      ),
    });

    expect(result.current).toMatchInlineSnapshot(`
      Array [
        "fui-FluentProviderR1a",
      ]
    `);
  });

  it('returns only proper classes', () => {
    const { result } = renderHook(() => useProviderThemeClasses(), {
      wrapper: props => (
        <ThemeClassNameProvider value="foo bar baz">
          <PortalCompatProvider>{props.children}</PortalCompatProvider>
        </ThemeClassNameProvider>
      ),
    });

    expect(result.current).toHaveLength(0);
  });

  it('logs a warning when does not have top level FluentProvider', () => {
    const warn = jest.fn().mockImplementation(noop);
    jest.spyOn(console, 'warn').mockImplementation(warn);

    renderHook(() => useProviderThemeClasses(), { wrapper: PortalCompatProvider });

    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('PortalCompatProvider: "useThemeClassName()" hook returned an empty string'),
    );
  });
});

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

  it('during register adds multiple classes from "ThemeClassNameContext" context if they exist', () => {
    const element = document.createElement('div');
    const { result } = renderHook(() => usePortalCompat(), {
      wrapper: TestWrapperWithMultipleClasses,
    });

    expect(result.current(element)).toBeInstanceOf(Function);
    expect(element.classList).toMatchInlineSnapshot(`
      DOMTokenList {
        "0": "fui-FluentProvider2",
        "1": "fui-FluentProvider1",
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
});
