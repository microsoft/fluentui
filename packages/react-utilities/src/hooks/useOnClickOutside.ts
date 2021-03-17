import * as React from 'react';
import { useEventCallback } from './useEventCallback';

export const useOnClickOutside = (options: {
  element?: Node | Window | Document;
  refs: React.MutableRefObject<HTMLElement>[];
  callback: (ev: Event) => void;
}) => {
  const { refs, callback, element = document } = options;
  const listener = useEventCallback((ev: Event) => {
    const isOutside = !refs.some(ref => ref.current?.contains(ev.target as HTMLElement));
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
