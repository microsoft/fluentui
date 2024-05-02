import type { Types as TabsterTypes } from 'tabster';

import { useTabster } from './useTabster';
import * as React from 'react';

/**
 * Subscribes to the tabster focused element. Calls the callback when the focused element changes.
 * @param callback - Callback to subscribe to the focused element.
 */
export function useFocusedElementChange(
  callback: TabsterTypes.SubscribableCallback<HTMLElement | undefined, TabsterTypes.FocusedElementDetail>,
) {
  const tabster = useTabster();
  React.useEffect(() => {
    if (tabster) {
      tabster.focusedElement.subscribe(callback);
      return () => tabster.focusedElement.unsubscribe(callback);
    }
  }, [tabster, callback]);
}
