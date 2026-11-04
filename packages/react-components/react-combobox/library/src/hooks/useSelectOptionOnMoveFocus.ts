'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxBaseState } from '../utils/ComboboxBase.types';
import { createReactKeyboardEvent } from '../utils/createReactKeyboardEvent';
import { isTabKeyEventHandled, markTabKeyEventHandled } from '../utils/handledTabKeyEvents';

// Avoid importing Tabster's event module, whose dependency graph reaches Tabster's runtime package.
const tabsterMoveFocusEventName = 'tabster:movefocus';

type TabsterMoveFocusEventDetail = {
  relatedEvent?: KeyboardEvent;
};

type UseSelectOptionOnMoveFocusOptions = Pick<
  ComboboxBaseState,
  'getOptionById' | 'multiselect' | 'open' | 'selectOption'
> & {
  activeDescendantController: ActiveDescendantImperativeRef;
};

const isKeyboardEventTargetingTrigger = (event: KeyboardEvent, trigger: HTMLElement) => {
  return event.target === trigger || !!event.composedPath?.().includes(trigger);
};

/**
 * Selects the active option before focus leaves an open single-select trigger through Tabster.
 * @internal
 */
export function useSelectOptionOnMoveFocus<Trigger extends HTMLElement>(
  options: UseSelectOptionOnMoveFocusOptions,
): React.Ref<Trigger> {
  const { activeDescendantController, getOptionById, multiselect, open, selectOption } = options;
  const triggerRef = React.useRef<Trigger>(null);
  const { targetDocument } = useFluent();

  const onTabsterMoveFocus = useEventCallback((event: Event) => {
    const relatedEvent = (event as CustomEvent<TabsterMoveFocusEventDetail>).detail?.relatedEvent;

    if (!relatedEvent || relatedEvent.defaultPrevented || isTabKeyEventHandled(relatedEvent)) {
      return;
    }

    const trigger = triggerRef.current;
    if (!trigger || relatedEvent.key !== 'Tab' || !isKeyboardEventTargetingTrigger(relatedEvent, trigger)) {
      return;
    }

    const activeOptionId = activeDescendantController.active();
    const activeOption = activeOptionId ? getOptionById(activeOptionId) : undefined;
    if (!activeOption) {
      return;
    }

    markTabKeyEventHandled(relatedEvent);
    const syntheticEvent = createReactKeyboardEvent(relatedEvent, trigger);

    try {
      ReactDOM.flushSync(() => selectOption(syntheticEvent.event, activeOption));
    } finally {
      syntheticEvent.release();
    }

    if (relatedEvent.defaultPrevented) {
      event.preventDefault();
    }
  });

  React.useEffect(() => {
    if (!targetDocument || !open || multiselect) {
      return;
    }

    targetDocument.addEventListener(tabsterMoveFocusEventName, onTabsterMoveFocus, true);
    return () => {
      targetDocument.removeEventListener(tabsterMoveFocusEventName, onTabsterMoveFocus, true);
    };
  }, [multiselect, onTabsterMoveFocus, open, targetDocument]);

  return triggerRef;
}
