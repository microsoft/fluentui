'use client';

import * as React from 'react';
import { useTimeout } from '@fluentui/react-utilities';
import { useTabster } from './useTabster';

/**
 * Returns a function that activates a modalizer by element from the modal or modal container.
 */
export function useActivateModal(): (elementFromModal: HTMLElement | undefined) => void {
  const managerRef = useTabster();
  const [setActivateModalTimeout] = useTimeout();

  const activateModal = React.useCallback(
    (elementFromModal: HTMLElement | undefined) => {
      // Call on the next tick: the element may have just received its data-tabster
      // attribute and the NavigationManager hasn't processed it yet.
      setActivateModalTimeout(() => {
        managerRef.current?.activateModal(elementFromModal);
      }, 0);
    },
    [managerRef, setActivateModalTimeout],
  );

  return activateModal;
}
