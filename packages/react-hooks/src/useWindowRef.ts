import { useRef, useEffect } from 'react';
import { getWindow } from '@uifabric/utilities/lib/dom';

/**
 * Hook that returns the window ref from a provided element ref.
 */
export const useWindowRef = (elementRef: React.RefObject<HTMLElement | null>) => {
  const windowRef = useRef<Window>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (windowRef as any).current = getWindow(elementRef.current);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (windowRef as any).current = null;
    };
  }, [elementRef]);

  return windowRef;
};
