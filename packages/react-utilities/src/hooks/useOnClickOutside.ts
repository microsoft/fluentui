import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export type UseOnClickOutsideOptions = {
  /**
   * The element to listen for the click event
   */
  element?: Document;
  /**
   * Refs to elements that check if the click is outside
   */
  refs: React.MutableRefObject<HTMLElement | undefined | null>[];
  /**
   * Called if the click is outside the element refs
   */
  callback: (ev: MouseEvent | TouchEvent) => void;
};

/**
 * Utility to perform checks where a click/touch event was made outside a compoent
 */
export const useOnClickOutside = (options: UseOnClickOutsideOptions) => {
  const { refs, callback, element = document } = options;
  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    const isOutside = refs.every(ref => !ref.current?.contains(ev.target as HTMLElement));
    if (isOutside) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    element?.addEventListener('click', listener);
    element?.addEventListener('touchstart', listener);

    return () => {
      element?.removeEventListener('click', listener);
      element?.removeEventListener('touchstart', listener);
    };
  }, [listener, element]);
};
