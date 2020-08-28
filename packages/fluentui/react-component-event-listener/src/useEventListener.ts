import * as React from 'react';

import { EventHandler, EventListenerOptions, EventTypes, Target } from './types';

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

    if (isActionSupported(element, 'addEventListener')) {
      element.addEventListener(type, eventHandler, capture);
    } else if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        '@fluentui/react-component-event-listener: Passed `element` is not valid or does not support `addEventListener()` method.',
      );
    }

    return () => {
      if (isActionSupported(element, 'removeEventListener')) {
        element.removeEventListener(type, eventHandler, capture);
      } else if (process.env.NODE_ENV !== 'production') {
        throw new Error(
          '@fluentui/react-component-event-listener: Passed `element` is not valid or does not support `removeEventListener()` method.',
        );
      }
    };
  }, [capture, eventHandler, target, targetRef, type]);
};
