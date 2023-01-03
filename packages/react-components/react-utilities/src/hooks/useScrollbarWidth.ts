import * as React from 'react';

/**
 * @returns The width in pixels of the scrollbar in the user agent
 */
export function useScrollbarWidth(options: { targetDocument: Document | undefined | null }) {
  const { targetDocument } = options;
  return React.useMemo(() => {
    if (!targetDocument) {
      return 0;
    }

    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll';

    const inner = document.createElement('div');
    outer.appendChild(inner);

    targetDocument.body.appendChild(outer);
    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
    outer.remove();
    return scrollbarWidth;
  }, [targetDocument]);
}
