'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';
import type { FocusRestorePolicy } from '../../types/index';

/**
 * Tracks focus ownership only; semantic destinations and focus execution belong to each chart.
 */
export function useChartFocusRestore(
  isChartTarget: (element: Element) => boolean,
): (policy?: FocusRestorePolicy) => boolean {
  const { targetDocument } = useFluent();
  const pendingFocusLoss = React.useRef<Element | null>(null);
  const focusVersion = React.useRef(0);
  const activeElementBeforeUpdate = targetDocument?.activeElement;
  const ownedElementBeforeUpdate =
    activeElementBeforeUpdate && isChartTarget(activeElementBeforeUpdate) ? activeElementBeforeUpdate : null;
  const focusVersionBeforeUpdate = focusVersion.current;

  useIsomorphicLayoutEffect(() => {
    // Snapshot ownership before React mutates the DOM: native focusout can precede detachment.
    if (
      ownedElementBeforeUpdate &&
      !ownedElementBeforeUpdate.isConnected &&
      targetDocument?.activeElement === targetDocument?.body &&
      focusVersion.current === focusVersionBeforeUpdate
    ) {
      pendingFocusLoss.current = ownedElementBeforeUpdate;
    }
  });

  React.useEffect(() => {
    if (!targetDocument) {
      return;
    }

    const onFocusIn = () => {
      focusVersion.current++;
      pendingFocusLoss.current = null;
    };
    targetDocument.addEventListener('focusin', onFocusIn);
    return () => {
      targetDocument.removeEventListener('focusin', onFocusIn);
    };
  }, [targetDocument]);

  // Run the chart's eligibility effect on every commit so a loss cannot survive an unrelated update.
  return (policy: FocusRestorePolicy = 'preserve'): boolean => {
    const activeElement = targetDocument?.activeElement;
    const ownsCurrentFocus = !!activeElement && isChartTarget(activeElement);
    const lostFocusOnUpdate =
      !!pendingFocusLoss.current && !pendingFocusLoss.current.isConnected && activeElement === targetDocument?.body;

    pendingFocusLoss.current = null;
    return policy === 'reset' || (policy === 'preserve' && (ownsCurrentFocus || lostFocusOnUpdate));
  };
}
