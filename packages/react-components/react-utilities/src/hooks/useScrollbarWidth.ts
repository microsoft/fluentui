'use client';

import * as React from 'react';
import { measureScrollbarWidth } from '../utils/measureScrollBarWidth';

const cache = new WeakMap<Document, number>();

interface UseScrollbarWidthOptions {
  /**
   * Reference document to measure the scrollbar width
   */
  targetDocument: Document | null | undefined;

  /**
   * Does not use the cache and recalculates the scrollbar width
   */
  force?: boolean;
}

/**
 * @returns The width in pixels of the scrollbar in the user agent
 * @remarks This hook is not SSR-safe. For SSR-safe scrollbar width application, use the `useApplyScrollbarWidth` from {@link file://./useApplyScrollbarWidth.ts} instead.
 */
export function useScrollbarWidth(options: UseScrollbarWidthOptions): number | undefined {
  const { targetDocument, force } = options;

  return React.useMemo(() => {
    if (!targetDocument) {
      return 0;
    }

    if (!force && cache.has(targetDocument)) {
      return cache.get(targetDocument);
    }

    const scrollbarWidth = measureScrollbarWidth(targetDocument);
    cache.set(targetDocument, scrollbarWidth);

    return scrollbarWidth;
  }, [targetDocument, force]);
}
