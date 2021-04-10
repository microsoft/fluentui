import * as React from 'react';
import { getWindow } from '@fluentui/utilities';
import { useOnEvent } from '@fluentui/react-hooks';
import { ResponsiveMode, getResponsiveMode, getInitialResponsiveMode } from '../decorators/withResponsiveMode';
import { useWindow } from '../../WindowProvider';

/**
 * Hook to get the current responsive mode (window size category).
 * @param elementRef - Use this element's parent window when determining the responsive mode.
 * @param responsiveMode - Override the responsive mode. If this param is present, return it as a result of this hook.
 */
export const useResponsiveMode = (elementRef: React.RefObject<HTMLElement | null>, responsiveMode?: ResponsiveMode) => {
  const initialResponsiveMode = responsiveMode !== undefined ? responsiveMode : getInitialResponsiveMode();
  const [lastResponsiveMode, setLastResponsiveMode] = React.useState<ResponsiveMode>(initialResponsiveMode);

  const onResize = React.useCallback(() => {
    if (responsiveMode !== undefined) {
      const newResponsiveMode = getResponsiveMode(getWindow(elementRef.current));

      // Setting the same value should not cause a re-render.
      if (lastResponsiveMode !== newResponsiveMode) {
        setLastResponsiveMode(newResponsiveMode);
      }
    }
  }, [elementRef, lastResponsiveMode, responsiveMode]);

  const win = useWindow();
  useOnEvent(win, 'resize', onResize as (ev: Event) => void);

  // Call resize function initially on mount.
  React.useEffect(() => {
    onResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only meant to run on mount
  }, []);

  return lastResponsiveMode;
};
