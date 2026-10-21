'use client';

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '@fluentui/react-utilities';

export type ElementListeners = Record<string, (event: Event) => void>;

type Subscription = {
  element: HTMLElement | null;
  types: string;
  abort: () => void;
};

const createSubscription = (): Subscription => ({ element: null, types: '', abort: () => undefined });

/**
 * Keeps the listeners `getListeners` returns attached to `ref.current`. Checks after every commit, since a ref does not
 * say when its element changes, but only resubscribes when the element or the event types change. The listeners must
 * be stable, e.g. from `useEventCallback`.
 */
export const useElementListeners = (
  ref: React.RefObject<HTMLElement | null>,
  getListeners: (element: HTMLElement) => ElementListeners,
): void => {
  const subscription = React.useRef(createSubscription());

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    const listeners = element ? getListeners(element) : {};
    const types = Object.keys(listeners).join();
    if (element === subscription.current.element && types === subscription.current.types) {
      return;
    }

    subscription.current.abort();
    subscription.current = createSubscription();

    if (!element) {
      return;
    }

    const controller = new AbortController();
    Object.entries(listeners).forEach(([type, listener]) =>
      element.addEventListener(type, listener, { signal: controller.signal }),
    );
    subscription.current = { element, types, abort: () => controller.abort() };
  });

  useIsomorphicLayoutEffect(
    () => () => {
      subscription.current.abort();
      subscription.current = createSubscription();
    },
    [],
  );
};
