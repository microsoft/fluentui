import * as React from 'react';

export const useCapture = ({ element, disabled, pointerId }) => {
  React.useEffect(() => {
    if (element) {
      !disabled && element.setPointerCapture(pointerId);
      return () => element.releasePointerCapture(pointerId);
    }
  }, [element, disabled, pointerId]);
};
