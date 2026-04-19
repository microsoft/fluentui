'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useTimeout } from '@fluentui/react-utilities';
import type { ModalizerInstance } from 'tabster/lite/modalizer';
import { getLiteObserver } from './useTabster';

/**
 * Returns a function that activates a modal by element from the modal or modal container.
 */
export function useActivateModal(): (elementFromModal: HTMLElement | undefined) => void {
  const { targetDocument } = useFluent();

  const [setActivateModalTimeout] = useTimeout();

  return React.useCallback(
    (elementFromModal: HTMLElement | undefined) => {
      // Defer by one tick — on the current tick the element may have just received its
      // data-tabster-lite-modalizer attribute, and the LiteObserver has not yet created
      // the instance. The timeout lets the MutationObserver callback run first.
      setActivateModalTimeout(() => {
        if (!elementFromModal || !targetDocument) return;

        // Walk up the DOM to find the element that carries data-tabster-lite-modalizer.
        let container: HTMLElement | null = elementFromModal;
        while (container && !container.hasAttribute('data-tabster-lite-modalizer')) {
          container = container.parentElement;
        }
        if (!container) return;

        (getLiteObserver(targetDocument)?.getInstance(container, 'modalizer') as ModalizerInstance | null)?.activate();
      }, 0);
    },
    [setActivateModalTimeout, targetDocument],
  );
}
