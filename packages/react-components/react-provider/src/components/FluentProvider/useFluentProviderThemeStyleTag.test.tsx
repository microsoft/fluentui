import { createDOMRenderer, RendererProvider } from '@griffel/react';
import type { Theme } from '@fluentui/react-theme';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { useFluentProviderThemeStyleTag } from './useFluentProviderThemeStyleTag';

jest.mock('@fluentui/react-theme');

describe('useFluentProviderThemeStyleTag', () => {
  const defaultTheme = ({
    'css-variable-1': '1',
    'css-variable-2': '2',
  } as unknown) as Theme;

  afterEach(() => {
    resetIdsForTests();
  });

  it('should render style tag', () => {
    // Act
    const { result } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document }),
    );

    // Assert
    expect(document.getElementById(result.current)).not.toBeNull();
  });

  it('should remove style tag on unmount', () => {
    // Arrange
    const { result, unmount } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document }),
    );

    // Act
    unmount();

    // Assert
    expect(document.getElementById(result.current)).toBeNull();
  });

  it('should render css variables in theme', () => {
    // Act
    const { result } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document }),
    );

    // Assert
    const tag = document.getElementById(result.current) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;

    expect(rule.selectorText).toEqual(`.${result.current}`);
    expect(rule.cssText).toMatchInlineSnapshot(`".fui-FluentProvider1 {--css-variable-1: 1; --css-variable-2: 2;}"`);
  });

  it('should update style tag on theme change', () => {
    // Arrange
    let theme = defaultTheme;
    const { result, rerender } = renderHook(() => useFluentProviderThemeStyleTag({ theme, targetDocument: document }));

    // Act
    theme = ({ 'css-variable-update': 'xxx' } as unknown) as Theme;
    rerender();

    // Assert
    const tag = document.getElementById(result.current) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;
    expect(rule.selectorText).toEqual(`.${result.current}`);
    expect(rule.cssText).toMatchInlineSnapshot(`".fui-FluentProvider1 {--css-variable-update: xxx;}"`);
  });

  it('should update style tag on theme change', () => {
    const renderer = createDOMRenderer(document, {
      styleElementAttributes: { nonce: 'random' },
    });

    const { result } = renderHook(
      () => useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document }),
      { wrapper: props => <RendererProvider renderer={renderer}>{props.children}</RendererProvider> },
    );
    const tag = document.getElementById(result.current) as HTMLStyleElement;

    expect(tag.getAttribute('id')).toBe('fui-FluentProvider1');
    expect(tag.getAttribute('nonce')).toBe('random');
  });
});
