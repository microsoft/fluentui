'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';

const { useRef, useEffect } = React;

/**
 * @deprecated migrated to \@fluentui\-contrib/react\-virtualizer for stable release.
 */
export const useMutationObserver = (
  target: Element | Document | undefined,
  callback: MutationCallback,
  options?: MutationObserverInit,
): {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  observer: React.MutableRefObject<MutationObserver | undefined>;
} => {
  'use no memo';

  // TODO: exclude types from this lint rule: https://github.com/microsoft/fluentui/issues/31286

  const observer = useRef<MutationObserver | undefined>(undefined);
  const { targetDocument } = useFluent();
  const win = targetDocument?.defaultView;

  useEffect(() => {
    if (!win) {
      return;
    }
    // Create an observer instance linked to the callback function
    observer.current = new win.MutationObserver(callback);
  }, [callback, win]);

  useEffect(() => {
    if (target) {
      // Start observing the target node for configured mutations
      observer.current?.observe(target, options);
    }

    return () => {
      observer.current?.disconnect();
    };
  }, [target, options]);

  return { observer };
};
