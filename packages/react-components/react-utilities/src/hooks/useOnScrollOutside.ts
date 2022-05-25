import * as React from 'react';
import { useEventCallback } from './useEventCallback';
import type { UseOnClickOrScrollOutsideOptions } from './useOnClickOutside';

/**
 * Utility to perform checks where a click/touch event was made outside a component
 */
export const useOnScrollOutside = (options: UseOnClickOrScrollOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp } = options;

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
      element?.addEventListener('wheel', listener);
      element?.addEventListener('touchmove', listener);
    }

    return () => {
      element?.removeEventListener('wheel', listener);
      element?.removeEventListener('touchmove', listener);
    };
  }, [listener, element, disabled]);
};
