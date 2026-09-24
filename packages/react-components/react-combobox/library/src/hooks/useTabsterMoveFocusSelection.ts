'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { TabsterMoveFocusEventName, type TabsterMoveFocusEvent } from '@fluentui/react-tabster';
import { useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxBaseState } from '../utils/ComboboxBase.types';
import { createReactKeyboardEvent } from '../utils/createReactKeyboardEvent';

export function useTabsterMoveFocusSelection(
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
