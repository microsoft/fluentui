import { type Types as TabsterTypes, disposeTabster } from 'tabster';
import * as React from 'react';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';

import { createTabsterWithConfig } from './useTabster';

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
    const tabster = createTabsterWithConfig(targetDocument);

    if (tabster) {
      tabster.focusedElement.subscribe(listener);

      return () => {
        tabster.focusedElement.unsubscribe(listener);
        disposeTabster(tabster);
      };
    }
  }, [listener, targetDocument]);
}
