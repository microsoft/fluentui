import type { Middleware } from '@floating-ui/dom';
import { renderHook } from '@testing-library/react';

import { usePositioningOptions } from './usePositioningOptions';

function renderNestedContainer() {
  const scrollParent = document.createElement('div');
  const wrapper = document.createElement('div');
  const container = document.createElement('div');

  scrollParent.style.overflow = 'auto';
  wrapper.appendChild(container);
  scrollParent.appendChild(wrapper);
  document.body.appendChild(scrollParent);

  return { container, scrollParent };
}

function getMiddlewareOptions(middleware: Middleware[], name: string) {
  return middleware.find(item => item.name === name)?.options;
}

describe('usePositioningOptions', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    jest.restoreAllMocks();
  });

  it('does not read computed styles of the container or its ancestors while resolving options', () => {
    const { container } = renderNestedContainer();
    const { result } = renderHook(() => usePositioningOptions({}));
    const getComputedStyleSpy = jest.spyOn(window, 'getComputedStyle');

    const { middleware } = result.current(container, null);

    expect(getComputedStyleSpy).not.toHaveBeenCalled();
    expect(getMiddlewareOptions(middleware, 'flip')).toBeDefined();
    expect(getMiddlewareOptions(middleware, 'shift')).toBeDefined();
  });

  it('keeps the default Floating UI boundary for flip and shift when no boundary is provided', () => {
    const { container } = renderNestedContainer();
    const { result } = renderHook(() => usePositioningOptions({}));

    const { middleware } = result.current(container, null);

    // Floating UI defaults "boundary" to "clippingAncestors", which already includes scrollable ancestors
    expect(getMiddlewareOptions(middleware, 'flip')).not.toHaveProperty('boundary');
    expect(getMiddlewareOptions(middleware, 'shift')).not.toHaveProperty('boundary');
  });

  it('uses the provided flip and overflow boundaries', () => {
    const { container, scrollParent } = renderNestedContainer();
    const { result } = renderHook(() =>
      usePositioningOptions({ flipBoundary: 'scrollParent', overflowBoundary: 'window' }),
    );

    const { middleware } = result.current(container, null);

    expect(getMiddlewareOptions(middleware, 'flip')).toMatchObject({ altBoundary: true, boundary: scrollParent });
    expect(getMiddlewareOptions(middleware, 'shift')).toMatchObject({
      altBoundary: true,
      boundary: document.documentElement,
    });
  });
});
