'use client';

import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import {
  createNavigationManager,
  disposeNavigationManager,
  type FocusedElementCallback,
} from '../focus-navigation/navigationManager';

/**
 * Subscribes to focused element changes in the document.
 * Calls `callback` whenever the focused element changes.
 */
export function useFocusedElementChange(callback: FocusedElementCallback): void {
  const { targetDocument } = useFluent();
  const listener = useEventCallback(callback);

  React.useEffect(() => {
    if (!targetDocument) return;

    const manager = createNavigationManager(targetDocument);
    const unsubscribe = manager.subscribeFocusedElement(listener);

    return () => {
      unsubscribe();
      disposeNavigationManager(manager);
    };
  }, [listener, targetDocument]);
}
