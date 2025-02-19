import * as React from 'react';
import { getModalizer } from 'tabster';
import { useTabster } from './useTabster';

/**
 * Returns a function that activates a modal by element from the modal or modal container.
 */
export function useActivateModal(): (elementFromModal: HTMLElement | undefined) => boolean {
  const tabster = useTabster();
  const modalizerAPI = tabster ? getModalizer(tabster) : undefined;

  const activateModal = React.useCallback(
    (elementFromModal: HTMLElement | undefined) => {
      return !!modalizerAPI?.activate(elementFromModal);
    },
    [modalizerAPI],
  );

  return activateModal;
}
