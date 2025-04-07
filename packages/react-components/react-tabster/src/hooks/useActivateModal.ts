import * as React from 'react';
import { getModalizer } from 'tabster';
import { useTimeout } from '@fluentui/react-utilities';
import { useTabster } from './useTabster';

/**
 * Returns a function that activates a modal by element from the modal or modal container.
 */
export function useActivateModal(): (elementFromModal: HTMLElement | undefined) => void {
  const modalizerRefAPI = useTabster(getModalizer);

  const [setActivateModalTimeout] = useTimeout();
  const activateModal = React.useCallback(
    (elementFromModal: HTMLElement | undefined) => {
      // We call the actual activation function on the next tick, because with the typical use case,
      // the hook will be called on the same tick when other Tabster attributes are being applied,
      // and on the current tick the element has just received the attributes, but Tabster has not
      // instantiated the Modalizer yet.
      setActivateModalTimeout(() => {
        modalizerRefAPI.current?.activate(elementFromModal);
      }, 0);
    },
    [modalizerRefAPI, setActivateModalTimeout],
  );

  return activateModal;
}
