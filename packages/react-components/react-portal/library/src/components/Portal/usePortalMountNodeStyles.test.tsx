import { renderHook } from '@testing-library/react-hooks';
import { Provider_unstable as Provider } from '@fluentui/react-shared-contexts';
import * as React from 'react';

import { usePortalMountNodeStyles, PORTAL_STYLE_ELEMENT_ID, setPortalRefCount } from './usePortalMountNodeStyles';

function queryStyleElement(): HTMLStyleElement | null {
  return document.head.querySelector(`#${PORTAL_STYLE_ELEMENT_ID}`);
}

function createWrapper(targetDocument: Document | undefined) {
  return (props: { children?: React.ReactNode }) => (
    <Provider value={{ dir: 'ltr', targetDocument }}>{props.children}</Provider>
  );
}

describe('usePortalMountNodeStyles', () => {
  afterEach(() => {
    // Clean up any leftover style elements and reset the ref count
    queryStyleElement()?.remove();
    setPortalRefCount(document, 0);
  });

  it('injects a <style> element into document.head when enabled', () => {
    expect(queryStyleElement()).toBeNull();

    renderHook(() => usePortalMountNodeStyles(false));

    const style = queryStyleElement();
    expect(style).not.toBeNull();
    expect(style!.parentElement).toBe(document.head);
  });

  it('does not inject a <style> element when disabled', () => {
    renderHook(() => usePortalMountNodeStyles(true));

    expect(queryStyleElement()).toBeNull();
  });

  it('does not inject a <style> element when targetDocument is undefined', () => {
    renderHook(() => usePortalMountNodeStyles(false), {
      wrapper: createWrapper(undefined),
    });

    expect(queryStyleElement()).toBeNull();
  });

  it('removes the <style> element on unmount', () => {
    const { unmount } = renderHook(() => usePortalMountNodeStyles(false));

    expect(queryStyleElement()).not.toBeNull();

    unmount();

    expect(queryStyleElement()).toBeNull();
  });

  it('shares a single <style> element across multiple consumers', () => {
    const hook1 = renderHook(() => usePortalMountNodeStyles(false));
    const hook2 = renderHook(() => usePortalMountNodeStyles(false));

    const allStyles = document.head.querySelectorAll(`#${PORTAL_STYLE_ELEMENT_ID}`);
    expect(allStyles.length).toBe(1);

    // Unmounting one consumer keeps the style
    hook1.unmount();
    expect(queryStyleElement()).not.toBeNull();

    // Unmounting the last consumer removes it
    hook2.unmount();
    expect(queryStyleElement()).toBeNull();
  });

  it('injects the style rule via insertRule', () => {
    renderHook(() => usePortalMountNodeStyles(false));

    const style = queryStyleElement();
    expect(style).not.toBeNull();
    expect(style!.sheet).not.toBeNull();
    expect(style!.sheet!.cssRules.length).toBe(1);
    expect(style!.sheet!.cssRules[0].cssText).toContain('[data-portal-node]');
  });

  it('prepends the <style> element as the first child of head', () => {
    // Add an existing element to head
    const existing = document.createElement('link');
    document.head.appendChild(existing);

    renderHook(() => usePortalMountNodeStyles(false));

    const style = queryStyleElement();
    expect(style).not.toBeNull();
    expect(document.head.firstElementChild).toBe(style);

    existing.remove();
  });
});
