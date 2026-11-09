'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import { getFocusableTags } from './tagFocusUtils';

/**
 * Keeps focus in a tag group when a focused tag is dismissed, as v9 TagGroup does with Tabster: on the next tag, else
 * the previous one, else `fallbackRef`.
 *
 * Call the returned function from `onDismiss`. Focus moves only when it was on the element that dismissed the tag and
 * the removal then dropped it to the body. Candidates that were removed or cannot take focus are skipped. A consumer
 * `preventDefault()` skips the focus move.
 */
export function useTagDismissFocus(
  containerRef: React.RefObject<HTMLElement | null>,
  fallbackRef?: React.RefObject<HTMLElement | null>,
): (event: React.SyntheticEvent) => void {
  const candidates = React.useRef<HTMLElement[] | null>(null);

  // Runs after the commit that removes the dismissed tag.
  useIsomorphicLayoutEffect(() => {
    const pending = candidates.current;
    candidates.current = null;
    const doc = containerRef.current?.ownerDocument;
    if (!pending || !doc || (doc.activeElement && doc.activeElement !== doc.body)) {
      return;
    }

    for (const candidate of [...pending, fallbackRef?.current]) {
      if (candidate?.isConnected) {
        candidate.focus();
        if (doc.activeElement === candidate) {
          return;
        }
      }
    }
  });

  return React.useCallback(
    (event: React.SyntheticEvent) => {
      const container = containerRef.current;
      const target = event.currentTarget as HTMLElement;
      if (event.isDefaultPrevented() || !container || !target.contains(container.ownerDocument.activeElement)) {
        return;
      }

      const tags = Array.from(getFocusableTags(container));
      const index = tags.indexOf(target);
      candidates.current = index === -1 ? null : [...tags.slice(index + 1), ...tags.slice(0, index).reverse()];
    },
    [containerRef],
  );
}
