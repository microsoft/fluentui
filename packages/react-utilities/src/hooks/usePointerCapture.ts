import * as React from 'react';

/**
 * Hook used to stop and start pointer capture on an element.
 *
 * @param element - The element to listen to
 * @param pointerId - The Id of the pointer event
 */
export const usePointerCapture = (element: HTMLElement | undefined, pointerId: number) => {
  React.useEffect(() => {
    if (element && element.setPointerCapture && element.releasePointerCapture) {
      element.setPointerCapture(pointerId);
      return () => element.releasePointerCapture(pointerId);
    }
  }, [element, pointerId]);
};
