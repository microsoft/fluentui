'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

/**
 * @param callback - invoked by the ResizeObserver with the observed entries.
 * @param onDetach - invoked when the ref is detached (element unmounts or is swapped for
 * null), immediately before `disconnect()`. Use it to tear down anything the observer
 * callback scheduled (e.g. a pending `requestAnimationFrame`) so it shares the observer's
 * own attach/detach lifecycle instead of an unrelated effect's. Must be a stable reference
 * (e.g. via `useEventCallback`) -- it participates in the ref callback's memoization, so an
 * identity that changes every render would detach and reattach the observer every render.
 */
export const useResizeObserverRef = <E extends HTMLElement>(
  callback: ResizeObserverCallback,
  onDetach?: () => void,
): React.Ref<E> => {
  const { targetDocument } = useFluent();
  const [observer] = React.useState(() => {
    const ResizeObserverConstructor = targetDocument?.defaultView?.ResizeObserver;
    if (ResizeObserverConstructor) {
      return new ResizeObserverConstructor(callback);
    }
  });
  const ref: React.RefCallback<E> = React.useCallback(
    element => {
      if (element) {
        observer?.observe(element);
      } else {
        onDetach?.();
        observer?.disconnect();
      }
    },
    [observer, onDetach],
  );
  return ref;
};
