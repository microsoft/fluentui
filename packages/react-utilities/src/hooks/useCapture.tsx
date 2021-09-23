import * as React from 'react';

type UseCapture = {
  /**
   * The element to listen to.
   */
  element: HTMLElement;

  /**
   * Whether event should be disabled and removed
   */
  disabled: boolean;

  /**
   * The Id of the pointer event.
   */
  pointerId: number;
};

export const useCapture = ({ element, disabled, pointerId }: UseCapture) => {
  React.useEffect(() => {
    if (element) {
      !disabled && element.setPointerCapture(pointerId);
      return () => element.releasePointerCapture(pointerId);
    }
  }, [element, disabled, pointerId]);
};
