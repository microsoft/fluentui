import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export interface UseOnClickOrScrollOutsideOptions {
  /**
   * The element to listen for the click event
   */
  element: Document | undefined;
  /**
   * Refs to elements that check if the click is outside
   */
  refs: React.MutableRefObject<HTMLElement | undefined | null>[];

  /**
   * By default uses element.contains, but custom contain function can be provided
   * @param parentRef - provided parent ref
   * @param child - event target element
   */
  contains?(parent: HTMLElement | null, child: HTMLElement): boolean;

  /**
   * Disables event listeners
   */
  disabled?: boolean;
  /**
   * Called if the click is outside the element refs
   */
  callback: (ev: MouseEvent | TouchEvent) => void;
}

/**
 * Utility to perform checks where a click/touch event was made outside a compoent
 */
export const useOnClickOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp } = options;
  const timeoutId = React.useRef<number | undefined>(undefined);

  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    const contains: UseOnClickOrScrollOutsideOptions['contains'] =
      containsProp || ((parent, child) => !!parent?.contains(child));

    const isOutside = refs.every(ref => !contains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    // Store the current event to avoid triggering handlers immediately
    // Note this depends on a deprecated but extremely well supported quirk of the web platform
    // https://github.com/facebook/react/issues/20074
    let currentEvent = getWindowEvent(window);

    const conditionalHandler = (event: MouseEvent | TouchEvent) => {
      // Skip if this event is the same as the one running when we added the handlers
      if (event === currentEvent) {
        currentEvent = undefined;
        return;
      }

      listener(event);
    };

    if (!disabled) {
      element?.addEventListener('click', conditionalHandler);
      element?.addEventListener('touchstart', conditionalHandler);
    }

    // Garbage collect this event after it's no longer useful to avoid memory leaks
    timeoutId.current = window.setTimeout(() => {
      currentEvent = undefined;
    }, 1);

    return () => {
      element?.removeEventListener('click', conditionalHandler);
      element?.removeEventListener('touchstart', conditionalHandler);

      clearTimeout(timeoutId.current);
      currentEvent = undefined;
    };
  }, [listener, element, disabled]);
};

const getWindowEvent = (target: Node | Window): Event | undefined => {
  if (target) {
    if (typeof (target as Window).window === 'object' && (target as Window).window === target) {
      // eslint-disable-next-line deprecation/deprecation
      return target.event;
    }

    // eslint-disable-next-line deprecation/deprecation
    return (target as Node).ownerDocument?.defaultView?.event ?? undefined;
  }

  return undefined;
};
