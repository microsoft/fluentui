import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export type UseOnClickOutsideOptions = {
  /**
   * The element to listen for the click event
   */
  element: Document | undefined;
  /**
   * Refs to elements that check if the click is outside
   */
  refs: React.MutableRefObject<HTMLElement | undefined | null>[];
  /**
   * Called if the click is outside the element refs
   */
  callback: (ev: MouseEvent | TouchEvent) => void;

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
};

/**
 * Utility to perform checks where a click/touch event was made outside a compoent
 */
export const useOnClickOutside = (options: UseOnClickOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp } = options;

  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    const contains: UseOnClickOutsideOptions['contains'] =
      containsProp || ((parent, child) => !!parent?.contains(child));

    const isOutside = refs.every(ref => !contains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    if (!disabled) {
      element?.addEventListener('click', listener);
      element?.addEventListener('touchstart', listener);
    }

    return () => {
      element?.removeEventListener('click', listener);
      element?.removeEventListener('touchstart', listener);
    };
  }, [listener, element, disabled]);
};
