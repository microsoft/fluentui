import * as React from 'react';
import { useEventCallback } from './useEventCallback';
import { UseOnClickOrScrollOutsideOptions } from './useOnClickOutside';

/**
 * Utility to perform checks where a click/touch event was made outside a compoent
 */
export const useOnScrollOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp, capture } = options;

  const listener = useEventCallback((ev: MouseEvent | TouchEvent) => {
    const contains: UseOnClickOrScrollOutsideOptions['contains'] =
      containsProp || ((parent, child) => !!parent?.contains(child));

    const isOutside = refs.every(ref => !contains(ref.current || null, ev.target as HTMLElement));
    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    if (!disabled) {
      element?.addEventListener('wheel', listener, !!capture);
      element?.addEventListener('touchmove', listener, !!capture);
    }

    return () => {
      element?.removeEventListener('wheel', listener, !!capture);
      element?.removeEventListener('touchmove', listener, !!capture);
    };
  }, [listener, element, disabled, capture]);
};
