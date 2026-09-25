'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { TabsterMoveFocusEventName, type TabsterMoveFocusEvent } from '@fluentui/react-tabster';
import { useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxBaseState } from '../utils/ComboboxBase.types';
import { createReactKeyboardEvent } from '../utils/createReactKeyboardEvent';

/**
 * Selects the active option when focus moves away from the trigger during Tabster-managed navigation.
 * @internal
 */
export function useSelectOptionOnMoveFocus(
  state: Pick<ComboboxBaseState, 'getOptionById' | 'multiselect' | 'open' | 'selectOption'> & {
    activeDescendantController: ActiveDescendantImperativeRef;
  },
): React.RefObject<HTMLElement | null> {
  const { activeDescendantController, getOptionById, multiselect, open, selectOption } = state;
  const triggerRef = React.useRef<HTMLElement>(null);
  const { targetDocument } = useFluent();

  const selectActiveOption = useEventCallback((relatedEvent: KeyboardEvent) => {
    const trigger = triggerRef.current;
    if (!trigger || !open || multiselect || relatedEvent.key !== 'Tab' || relatedEvent.target !== trigger) {
      return;
    }

    const activeOptionId = activeDescendantController.active();
    const activeOption = activeOptionId ? getOptionById(activeOptionId) : undefined;
    if (activeOption) {
      const syntheticEvent = createReactKeyboardEvent(relatedEvent, trigger);
      try {
        // FIXME: Tabster moves focus before React has a chance to commit this state update in React 18.
        // Flush synchronously so the active option is selected before focus leaves the trigger.
        ReactDOM.flushSync(() => selectOption(syntheticEvent.event, activeOption));
      } finally {
        syntheticEvent.release();
      }
    }
  });

  const onTabsterMoveFocus = useEventCallback((event: TabsterMoveFocusEvent) => {
    const relatedEvent = event.detail?.relatedEvent;
    if (relatedEvent) {
      selectActiveOption(relatedEvent);
    }
  });

  React.useEffect(() => {
    targetDocument?.addEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus, true);
    return () => {
      targetDocument?.removeEventListener(TabsterMoveFocusEventName, onTabsterMoveFocus, true);
    };
  }, [onTabsterMoveFocus, targetDocument]);

  return triggerRef;
}
