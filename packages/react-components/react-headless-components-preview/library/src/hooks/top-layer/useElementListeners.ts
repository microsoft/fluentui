'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

type Subscription = {
  element: HTMLElement | null;
  types: string[] | null;
  abort: () => void;
};

const NO_SUBSCRIPTION: Subscription = { element: null, types: null, abort: () => undefined };

/**
 * Keeps `listener` attached to `ref.current` for the event types `getTypes` returns. Checks after every commit, since a
 * ref does not say when its element changes, but only resubscribes when the element or the types change. `listener`
 * must be stable, e.g. from `useEventCallback`, and `getTypes` must return the same array for the same types.
 */
export const useElementListeners = (
  ref: React.RefObject<HTMLElement | null>,
  listener: (event: Event) => void,
  getTypes: (element: HTMLElement) => string[],
): void => {
  const subscription = React.useRef(NO_SUBSCRIPTION);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const types = element ? getTypes(element) : null;
    if (element === subscription.current.element && types === subscription.current.types) {
      return;
    }

    subscription.current.abort();
    subscription.current = NO_SUBSCRIPTION;

    if (!element || !types) {
      return;
    }

    const controller = new AbortController();
    types.forEach(type => element.addEventListener(type, listener, { signal: controller.signal }));
    subscription.current = { element, types, abort: () => controller.abort() };
  });

  useIsomorphicLayoutEffect(
    () => () => {
      subscription.current.abort();
      subscription.current = NO_SUBSCRIPTION;
    },
    [],
  );
};
