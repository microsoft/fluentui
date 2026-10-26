'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import type { FocusRestorePolicy } from '../../types/index';

/**
 * Tracks focus ownership only; semantic destinations and focus execution belong to each chart.
 */
export function useChartFocusRestore(
  getFocusedTarget: () => Element | null | undefined,
): (policy?: FocusRestorePolicy) => boolean {
  const { targetDocument } = useFluent();
  const lastFocusedElement = React.useRef<Element | null>(null);
  const ownedFocus = React.useRef(false);
  const getChartTarget = useEventCallback(getFocusedTarget);

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const onFocusIn = () => {
      const element = targetDocument.activeElement;
      lastFocusedElement.current = element;
      ownedFocus.current = !!element && element === getChartTarget();
    };
    const onFocusOut = () => {
      // Explicit blur relinquishes ownership. Removing a focused node does not emit focusout.
      if (lastFocusedElement.current?.isConnected) {
        ownedFocus.current = false;
      }
    };
    onFocusIn();
    targetDocument.addEventListener('focusin', onFocusIn);
    targetDocument.addEventListener('focusout', onFocusOut);
    return () => {
      targetDocument.removeEventListener('focusin', onFocusIn);
      targetDocument.removeEventListener('focusout', onFocusOut);
    };
  }, [getChartTarget, targetDocument]);

  return useEventCallback((policy: FocusRestorePolicy = 'preserve'): boolean => {
    const activeElement = targetDocument?.activeElement;
    const ownsCurrentFocus = !!activeElement && activeElement === getChartTarget();
    const lostFocusOnUpdate =
      ownedFocus.current &&
      !!lastFocusedElement.current &&
      !lastFocusedElement.current.isConnected &&
      activeElement === targetDocument?.body;

    // A detached element is eligible only for the current update, not a later background update.
    if (lostFocusOnUpdate) {
      ownedFocus.current = false;
    }
    return policy === 'reset' || (policy === 'preserve' && (ownsCurrentFocus || lostFocusOnUpdate));
  });
}
