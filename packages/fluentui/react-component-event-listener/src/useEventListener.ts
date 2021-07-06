import * as React from 'react';

import { EventHandler, EventListenerOptions, EventTypes, Target } from './types';

const getWindowEvent = (target: Target): Event | undefined => {
  if (target) {
    if (typeof (target as Window).window === 'object' && (target as Window).window === target) {
      return target.event;
    }

    return (target as Node).ownerDocument?.defaultView?.event ?? undefined;
  }

  return undefined;
};

const isActionSupported = (
  element: Target | null | undefined,
  method: 'addEventListener' | 'removeEventListener',
): element is Target => (element ? !!element[method] : false);

export const useEventListener = <T extends EventTypes>(options: EventListenerOptions<T>): void => {
  const { capture, listener, type, target, targetRef } = options;

  const latestListener = React.useRef<EventHandler<T>>(listener);
  latestListener.current = listener;

  const eventHandler = React.useCallback((event: DocumentEventMap[T]) => {
    return latestListener.current(event);
  }, []);

  const timeoutId = React.useRef<number | undefined>(undefined);

  if (process.env.NODE_ENV !== 'production') {
    // This is fine to violate there conditional rule as environment variables will never change during component
    // lifecycle
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      if (typeof target !== 'undefined' && typeof targetRef !== 'undefined') {
        throw new Error('`target` and `targetRef` props are mutually exclusive, please use one of them.');
      }

      if (typeof target === 'undefined' && typeof targetRef === 'undefined') {
        throw new Error("`target` and `targetRef` props are `undefined`, it' required to use one of them.");
      }
    }, [target, targetRef]);
  }

  React.useEffect(() => {
    const element: Target | null | undefined = typeof targetRef === 'undefined' ? target : targetRef.current;

    // Store the current event to avoid triggering handlers immediately
    // Note this depends on a deprecated but extremely well supported quirk of the web platform
    // https://github.com/facebook/react/issues/20074
    let currentEvent = getWindowEvent(window);

    const conditionalHandler = (event: DocumentEventMap[T]) => {
      // Skip if this event is the same as the one running when we added the handlers
      if (event === currentEvent) {
        currentEvent = undefined;
        return;
      }

      eventHandler(event);
    };

    if (isActionSupported(element, 'addEventListener')) {
      element.addEventListener(type, conditionalHandler, capture);
    } else if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        '@fluentui/react-component-event-listener: Passed `element` is not valid or does not support `addEventListener()` method.',
      );
    }

    // @ts-ignore We have a collision between types from DOM and @types/node
    timeoutId.current = setTimeout(() => {
      currentEvent = undefined;
    }, 1);

    return () => {
      clearTimeout(timeoutId.current);
      currentEvent = undefined;

      if (isActionSupported(element, 'removeEventListener')) {
        element.removeEventListener(type, conditionalHandler, capture);
      } else if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          '@fluentui/react-component-event-listener: Passed `element` is not valid or does not support `removeEventListener()` method.',
        );
      }
    };
  }, [capture, eventHandler, target, targetRef, type]);
};
