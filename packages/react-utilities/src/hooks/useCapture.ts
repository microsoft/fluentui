import * as React from 'react';

type UseCapture = {
  /**
   * The element to listen to.
   */
  element?: HTMLElement;

  /**
   * Whether event should be disabled and removed
   */
  disabled: boolean;

  /**
   * The Id of the pointer event.
   */
  pointerId: number;
};

/**
 * Hook used to add and remove a event from an element.
 *
 * @param element - The element to listen to
 * @param disabled - Whether event should be disabled and removed
 * @param pointerId - The Id of the pointer event
 */
export const useCapture = ({ element, disabled, pointerId }: UseCapture) => {
  React.useEffect(() => {
    if (element && !disabled && element.setPointerCapture && element.releasePointerCapture) {
      element.setPointerCapture(pointerId);
      return () => element.releasePointerCapture(pointerId);
    }
  }, [element, disabled, pointerId]);
};
