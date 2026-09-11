'use client';

import type { Types as TabsterTypes } from 'tabster';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import { tabster } from '../tabsterCompat';

import { createTabsterWithConfig } from './useTabster';

const { disposeTabster } = tabster;

/**
 * Subscribes to the tabster focused element. Calls the callback when the focused element changes.
 * @param callback - Callback to subscribe to the focused element.
 */
export function useFocusedElementChange(
  callback: TabsterTypes.SubscribableCallback<HTMLElement | undefined, TabsterTypes.FocusedElementDetail>,
): void {
  const { targetDocument } = useFluent();
  const listener = useEventCallback(callback);

  React.useEffect(() => {
    const tabsterInstance = createTabsterWithConfig(targetDocument);

    if (tabsterInstance) {
      tabsterInstance.focusedElement.subscribe(listener);

      return () => {
        tabsterInstance.focusedElement.unsubscribe(listener);
        disposeTabster(tabsterInstance);
      };
    }
  }, [listener, targetDocument]);
}
