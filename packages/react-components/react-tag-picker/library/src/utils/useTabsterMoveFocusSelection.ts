'use client';

import * as React from 'react';
import { TabsterMoveFocusEventName, type TabsterMoveFocusEvent } from '@fluentui/react-tabster';
import type { ActiveDescendantImperativeRef } from '@fluentui/react-aria';
import { useEventCallback } from '@fluentui/react-utilities';
import type { ComboboxState } from '@fluentui/react-combobox';

type UseTabsterMoveFocusSelectionOptions = Pick<
  ComboboxState,
  'getOptionById' | 'multiselect' | 'open' | 'selectOption'
> & {
  activeDescendantController: ActiveDescendantImperativeRef;
};

export function useTabsterMoveFocusSelection(
  options: UseTabsterMoveFocusSelectionOptions,
): React.RefObject<HTMLButtonElement | null> {
  const ref = React.useRef<HTMLButtonElement>(null);
  const onMoveFocus = useEventCallback((event: TabsterMoveFocusEvent) => {
    const relatedEvent = event.detail.relatedEvent;
    if (!options.open || options.multiselect || relatedEvent?.key !== 'Tab' || relatedEvent.target !== ref.current) {
      return;
    }

    const activeOptionId = options.activeDescendantController.active();
    const activeOption = activeOptionId ? options.getOptionById(activeOptionId) : undefined;
    activeOption && options.selectOption(relatedEvent as unknown as React.KeyboardEvent<HTMLElement>, activeOption);
  });

  React.useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const targetDocument = element.ownerDocument;
    targetDocument.addEventListener(TabsterMoveFocusEventName, onMoveFocus as EventListener, true);
    return () => targetDocument.removeEventListener(TabsterMoveFocusEventName, onMoveFocus as EventListener, true);
  }, [onMoveFocus]);

  return ref;
}
