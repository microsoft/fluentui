'use client';

import * as React from 'react';
import { useId } from '@fluentui/react-utilities';

/**
 * Generates a unique `anchor-name` and keeps it applied to whichever target
 * element is currently active. Swapping targets clears the previous element's
 * `anchor-name`; unmounting clears the last-known target.
 *
 * Returns the anchor-name string so the surface can reference it via
 * `position-anchor`.
 */
export function useAnchorName(effectiveTarget: HTMLElement | null): string {
  const anchorName = useId('--popover-anchor-');
  const anchoredTargetRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const prev = anchoredTargetRef.current;

    if (prev && prev !== effectiveTarget) {
      prev.style.removeProperty('anchor-name');
    }

    if (effectiveTarget) {
      effectiveTarget.style.setProperty('anchor-name', anchorName);
    }

    anchoredTargetRef.current = effectiveTarget;
  }, [effectiveTarget, anchorName]);

  React.useEffect(() => {
    return () => {
      const last = anchoredTargetRef.current;

      if (last) {
        last.style.removeProperty('anchor-name');
        anchoredTargetRef.current = null;
      }
    };
  }, []);

  return anchorName;
}
