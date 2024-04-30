import type { Types as TabsterTypes } from 'tabster';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

import { useTabster } from './useTabster';

/**
 * Subscribes to the tabster focused element. Calls the callback when the focused element changes.
 * @param callback - Callback to subscribe to the focused element.
 */
export function useListenFocusedElement(
  callback: TabsterTypes.SubscribableCallback<HTMLElement | undefined, TabsterTypes.FocusedElementDetail>,
) {
  const tabster = useTabster();
  useIsomorphicLayoutEffect(() => {
    if (tabster) {
      tabster.focusedElement.subscribe(callback);
      return () => tabster.focusedElement.unsubscribe(callback);
    }
  }, [tabster, callback]);
}
