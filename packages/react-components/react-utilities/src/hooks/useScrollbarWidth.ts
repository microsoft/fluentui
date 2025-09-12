import * as React from 'react';

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

function measureScrollbarWidth(targetDocument: Document, force?: boolean): number {
  if (!force && cache.has(targetDocument)) {
    return cache.get(targetDocument)!;
  }

  const outer = targetDocument.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';

  const inner = targetDocument.createElement('div');
  outer.appendChild(inner);

  targetDocument.body.appendChild(outer);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.remove();
  cache.set(targetDocument, scrollbarWidth);
  return scrollbarWidth;
}

/**
 * @returns The width in pixels of the scrollbar in the user agent
 */
export function useScrollbarWidth(options: UseScrollbarWidthOptions): number | undefined {
  const { targetDocument, force } = options;
  const [scrollbarWidth, setScrollbarWidth] = React.useState<number | undefined>(undefined);

  React.useEffect(() => {
    if (!targetDocument) {
      setScrollbarWidth(0);
      return;
    }

    const width = measureScrollbarWidth(targetDocument, force);
    setScrollbarWidth(width);
  }, [targetDocument, force]);

  return scrollbarWidth;
}
