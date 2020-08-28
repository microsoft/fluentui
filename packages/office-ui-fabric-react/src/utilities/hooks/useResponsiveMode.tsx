import * as React from 'react';
import { getWindow } from '@uifabric/utilities';
import { useOnEvent } from '@uifabric/react-hooks';
import { ResponsiveMode, getResponsiveMode, getInitialResponsiveMode } from '../decorators/withResponsiveMode';

export const useResponsiveMode = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [lastResponsiveMode, setLastResponsiveMode] = React.useState<ResponsiveMode>(getInitialResponsiveMode);

  const onResize = React.useCallback(() => {
    // Setting the same value should not cause a re-render.
    const newResponsiveMode = getResponsiveMode(getWindow(elementRef.current));

    if (lastResponsiveMode !== newResponsiveMode) {
      setLastResponsiveMode(newResponsiveMode);
    }
  }, [elementRef, lastResponsiveMode]);

  useOnEvent(window, 'resize', onResize as (ev: Event) => void);

  // Call resize function initially on mount.
  React.useEffect(() => {
    onResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only meant to run on mount
  }, []);

  return lastResponsiveMode;
};
