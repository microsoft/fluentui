import * as React from 'react';
import { getWindow } from '@fluentui/utilities';
import { useOnEvent } from '@fluentui/react-hooks';
import { ResponsiveMode, getResponsiveMode, getInitialResponsiveMode } from '../decorators/withResponsiveMode';
import { useWindow } from '../../WindowProvider';

/**
 * Hook to get the current responsive mode (window size category).
 * @param elementRef - Use this element's parent window when determining the responsive mode.
 * @param overrideResponsiveMode - Override the responsive mode. If this param is present, it's always returned.
 */
export const useResponsiveMode = (
  elementRef: React.RefObject<HTMLElement | null>,
  overrideResponsiveMode?: ResponsiveMode,
) => {
  const [lastResponsiveMode, setLastResponsiveMode] = React.useState<ResponsiveMode>(getInitialResponsiveMode());

  const onResize = React.useCallback(() => {
    const newResponsiveMode = getResponsiveMode(getWindow(elementRef.current));

    // Setting the same value should not cause a re-render.
    if (lastResponsiveMode !== newResponsiveMode) {
      setLastResponsiveMode(newResponsiveMode);
    }
  }, [elementRef, lastResponsiveMode]);

  const win = useWindow();
  useOnEvent(win, 'resize', onResize);

  // Call resize function initially on mount, or if the override changes from defined to undefined
  // (the effect will run on all override changes, but onResize will only be called if it changed to undefined)
  React.useEffect(() => {
    if (overrideResponsiveMode === undefined) {
      onResize();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only meant to run on mount or when override changes
  }, [overrideResponsiveMode]);

  return overrideResponsiveMode ?? lastResponsiveMode;
};
