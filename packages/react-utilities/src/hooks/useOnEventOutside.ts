import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export interface UseOnEventOutsideOptions<TEvent extends Event> {
  /**
   * The element to listen for the event
   */
  element: Document | undefined;
  /**
   * Refs to elements that check if the event is outside
   */
  refs: React.MutableRefObject<HTMLElement | undefined | null>[];
  /**
   * Called if the event is outside the element refs
   */
  callback: (ev: TEvent) => void;

  /**
   * By default uses element.contains, but custom contain function can be provided
   * @param parentRef - provided parent ref
   * @param child - event target element
   */
  contains?(parent: HTMLElement | null, child: HTMLElement): boolean;

  /**
   * Disables event listener
   */
  disabled?: boolean;
}

/**
 * We don't want upstream hooks to specify the event
 */
interface UseOnEventOutsideOptionsInternal<TEvent extends Event> extends UseOnEventOutsideOptions<TEvent> {
  event: keyof DocumentEventMap;
}

/**
 * Utility to perform checks where a wheel/scrool event was made outside a compoent
 *
 * @internal Cannot not guarantee type safety of events, only use internally
 */
export const useOnEventOutside = <TEvent extends Event>(options: UseOnEventOutsideOptionsInternal<TEvent>) => {
  const { refs, callback, element, disabled, contains: containsProp, event } = options;

  const listener = useEventCallback((ev: Event) => {
    const contains: typeof containsProp = containsProp || ((parent, child) => !!parent?.contains(child));

    const isOutside = refs.every(ref => !contains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev as TEvent);
    }
  });

  React.useEffect(() => {
    if (!disabled) {
      element?.addEventListener(event, listener);
    }

    return () => {
      element?.removeEventListener(event, listener);
    };
  }, [listener, element, disabled, event]);
};
