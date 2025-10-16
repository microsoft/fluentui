'use client';

import * as React from 'react';
import { measureScrollbarWidth } from '../utils/measureScrollBarWidth';

const cache = new WeakMap<Document, number>();

interface UseApplyScrollbarWidthOptions {
  /**
   * Does not use the cache and recalculates the scrollbar width
   */
  force?: boolean;

  /**
   * CSS property to apply the scrollbar width to.
   * @default 'width'
   */
  property?: string;
}

/**
 * A React hook that provides a ref for applying the browser's scrollbar width as a CSS property.
 *
 * This hook is SSR-safe and caches measurements per document to avoid redundant calculations.
 * When the ref is attached to an element, the hook automatically applies the measured scrollbar
 * width to the specified CSS property (defaults to 'width').
 *
 * @example
 * ```tsx
 * const scrollbarRef = useApplyScrollbarWidth({ targetDocument: document });
 * return <div ref={scrollbarRef} />;
 * ```
 */
export function useApplyScrollbarWidth<T extends HTMLElement>(
  options: UseApplyScrollbarWidthOptions = {},
): React.RefCallback<T> {
  const { force, property = 'width' } = options;

  const applyScrollbarWidth = React.useCallback(
    (element: T | null) => {
      if (!element) {
        return;
      }

      // If we have a cached value, use it
      if (!force && cache.has(element.ownerDocument)) {
        const cachedWidth = cache.get(element.ownerDocument);
        if (cachedWidth !== undefined) {
          element.style.setProperty(property, `${cachedWidth}px`);
          return;
        }
      }

      // Measure the scrollbar width and apply it to the element
      const scrollbarWidth = measureScrollbarWidth(element.ownerDocument);
      cache.set(element.ownerDocument, scrollbarWidth);
      element.style.setProperty(property, `${scrollbarWidth}px`);
    },
    [force, property],
  );

  return applyScrollbarWidth;
}
