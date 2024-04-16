import type { Theme } from '@fluentui/react-theme';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { renderHook } from '@testing-library/react-hooks';

import { useFluentProviderThemeStyleTag } from './useFluentProviderThemeStyleTag';

jest.mock('@fluentui/react-theme');
const createDocumentMock = (): Document => {
  const externalDocument = document.implementation.createDocument('http://www.w3.org/1999/xhtml', 'html', null);
  const body = document.createElement('body');
  const head = document.createElement('head');
  externalDocument.documentElement.appendChild(head);
  externalDocument.documentElement.appendChild(body);
  return externalDocument;
};

describe('useFluentProviderThemeStyleTag', () => {
  const defaultTheme = {
    'css-variable-1': '1',
    'css-variable-2': '2',
  } as unknown as Theme;

  afterEach(() => {
    resetIdsForTests();
  });

  it('should render style tag', () => {
    // Act
    const { result } = renderHook(() =>
      useFluentProviderThemeStyleTag({
        theme: defaultTheme,
        targetDocument: document,
        rendererAttributes: {},
      }),
    );

    // Assert
    expect(document.getElementById(result.current.styleTagId)).not.toBeNull();
  });

  it('should remove style tag on unmount', () => {
    // Arrange
    const { result, unmount } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document, rendererAttributes: {} }),
    );

    // Act
    unmount();

    // Assert
    expect(document.getElementById(result.current.styleTagId)).toBeNull();
  });

  it('should render css variables in theme', () => {
    // Act
    const { result } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument: document, rendererAttributes: {} }),
    );

    // Assert
    const tag = document.getElementById(result.current.styleTagId) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;

    expect(rule.selectorText).toEqual(`.${result.current.styleTagId}`);
    expect(rule.cssText).toMatchInlineSnapshot(`".fui-FluentProvider1 {--css-variable-1: 1; --css-variable-2: 2;}"`);
  });

  it('should update style tag on theme change', () => {
    // Arrange
    let theme = defaultTheme;
    const { result, rerender } = renderHook(() =>
      useFluentProviderThemeStyleTag({ theme, targetDocument: document, rendererAttributes: {} }),
    );

    // Act
    theme = { 'css-variable-update': 'xxx' } as unknown as Theme;
    rerender();

    // Assert
    const tag = document.getElementById(result.current.styleTagId) as HTMLStyleElement;
    const sheet = tag.sheet as CSSStyleSheet;
    const rule = sheet.cssRules[0] as CSSStyleRule;
    expect(rule.selectorText).toEqual(`.${result.current.styleTagId}`);
    expect(rule.cssText).toMatchInlineSnapshot(`".fui-FluentProvider1 {--css-variable-update: xxx;}"`);
  });

  it('should update style tag on theme change', () => {
    const { result } = renderHook(() =>
      useFluentProviderThemeStyleTag({
        theme: defaultTheme,
        targetDocument: document,
        rendererAttributes: { nonce: 'random' },
      }),
    );
    const tag = document.getElementById(result.current.styleTagId) as HTMLStyleElement;

    expect(tag.getAttribute('id')).toBe('fui-FluentProvider1');
    expect(tag.getAttribute('nonce')).toBe('random');
  });

  it('should move style tags in body to head on first render', () => {
    const targetDocument = createDocumentMock();
    const ssrStyleElement = targetDocument.createElement('style');
    // Kinda hacky - assume the useId call returns as expected (ids are reset after each test)
    ssrStyleElement.setAttribute('id', 'fui-FluentProvider1');
    targetDocument.body.append(ssrStyleElement);

    jest.spyOn(targetDocument, 'createElement');
    renderHook(() => useFluentProviderThemeStyleTag({ theme: defaultTheme, targetDocument, rendererAttributes: {} }));

    expect(targetDocument.body.querySelector('style')).toBeNull();
    expect(targetDocument.head.querySelectorAll('style').length).toBe(1);
    // eslint-disable-next-line deprecation/deprecation
    expect(targetDocument.createElement).toHaveBeenCalledTimes(0);
  });
});
