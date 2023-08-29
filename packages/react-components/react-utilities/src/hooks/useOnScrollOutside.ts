import * as React from 'react';
import { useEventCallback } from './useEventCallback';
import { UseOnClickOutsideOptions } from './useOnClickOutside';

export type UseOnScrollOutsideOptions = Pick<UseOnClickOutsideOptions, 'element' | 'refs' | 'contains' | 'disabled'> & {
  /**
   * Called if the scroll is outside the element refs
   */
  callback: (ev: Event | MouseEvent | TouchEvent) => void;
};

/**
 * @internal
 * Utility to perform checks where a scroll/touch event was made outside a component
 */
export const useOnScrollOutside = (options: UseOnScrollOutsideOptions) => {
  const { refs, callback, element, disabled, contains: containsProp } = options;

  const listener = useEventCallback((ev: Event | MouseEvent | TouchEvent) => {
    const contains: UseOnScrollOutsideOptions['contains'] =
      containsProp || ((parent, child) => !!parent?.contains(child));

    const target = ev.composedPath()[0] as HTMLElement;
    const isOutside = refs.every(ref => !contains(ref.current || null, target));

    if (isOutside && !disabled) {
      callback(ev);
    }
  });

  React.useEffect(() => {
    if (disabled) {
      return;
    }

    element?.addEventListener('wheel', listener);
    element?.addEventListener('touchmove', listener);
    // use capture phase because scroll does not bubble
    element?.addEventListener('scroll', listener, true);

    return () => {
      element?.removeEventListener('wheel', listener);
      element?.removeEventListener('touchmove', listener);
      element?.removeEventListener('scroll', listener, true);
    };
  }, [listener, element, disabled]);
};
