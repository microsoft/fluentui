'use client';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useActiveDescendantContext } from '@fluentui/react-aria';
import { useFluent_unstable as useFluent } from '@fluentui/react-shared-contexts';
import { TabsterMoveFocusEventName, type TabsterMoveFocusEvent } from '@fluentui/react-tabster';
import { useEventCallback } from '@fluentui/react-utilities';
import { useTagPickerContext_unstable } from '../contexts/TagPickerContext';

const syntheticProperties = new Set([
  'nativeEvent',
  'currentTarget',
  'isDefaultPrevented',
  'isPropagationStopped',
  'persist',
]);

export function useTabsterMoveFocusSelection(): React.RefObject<HTMLElement | null> {
  const { controller: activeDescendantController } = useActiveDescendantContext();
  const getOptionById = useTagPickerContext_unstable(ctx => ctx.getOptionById);
  const multiselect = useTagPickerContext_unstable(ctx => (ctx.selectionMode ?? 'multiselect') === 'multiselect');
  const open = useTagPickerContext_unstable(ctx => ctx.open);
  const selectOption = useTagPickerContext_unstable(ctx => ctx.selectOption);
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

function createReactKeyboardEvent(nativeEvent: KeyboardEvent, currentTarget: HTMLElement) {
  let callbackCurrentTarget: HTMLElement | null = currentTarget;
  let propagationStopped = false;

  const event = new Proxy(nativeEvent, {
    has(target, property) {
      return syntheticProperties.has(property as string) || Reflect.has(target, property);
    },
    get(target, property) {
      switch (property) {
        case 'nativeEvent':
          return target;
        case 'currentTarget':
          return callbackCurrentTarget;
        case 'isDefaultPrevented':
          return () => target.defaultPrevented;
        case 'isPropagationStopped':
          return () => propagationStopped;
        case 'persist':
          return () => undefined;
        case 'preventDefault':
          return () => target.preventDefault();
        case 'stopPropagation':
          return () => {
            propagationStopped = true;
            target.stopPropagation();
          };
        default: {
          const value = Reflect.get(target, property, target);
          return typeof value === 'function' ? value.bind(target) : value;
        }
      }
    },
  }) as unknown as React.KeyboardEvent<HTMLElement>;

  return {
    event,
    release: () => {
      callbackCurrentTarget = null;
    },
  };
}
