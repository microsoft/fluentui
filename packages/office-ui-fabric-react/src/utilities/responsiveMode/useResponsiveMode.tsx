import * as React from 'react';
import { getWindow } from '@uifabric/utilities';
import { useConstCallback, useOnEvent } from '@uifabric/react-hooks';
import { ResponsiveMode } from './withResponsiveMode.types';

const RESPONSIVE_MAX_CONSTRAINT = [479, 639, 1023, 1365, 1919, 99999999];

/**
 * User specified mode to default to, useful for server side rendering scenarios.
 */
let _defaultMode: ResponsiveMode | undefined;

/**
 * Tracking the last mode we successfully rendered, which allows us to
 * paint initial renders with the correct size.
 */
let _lastMode: ResponsiveMode | undefined;

const getResponsiveMode = (currentWindow: Window | undefined): ResponsiveMode => {
  let responsiveMode = ResponsiveMode.small;

  if (currentWindow) {
    try {
      while (currentWindow.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++;
      }
    } catch (e) {
      // Return a best effort result in cases where we're in the browser but it throws on getting innerWidth.
      responsiveMode = _defaultMode || _lastMode || ResponsiveMode.large;
    }

    // Tracking last mode just gives us a better default in future renders,
    // which avoids starting with the wrong value if we've measured once.
    _lastMode = responsiveMode;
  } else {
    if (_defaultMode !== undefined) {
      responsiveMode = _defaultMode;
    } else {
      throw new Error(
        'Content was rendered in a server environment without providing a default responsive mode. ' +
          'Call setResponsiveMode to define what the responsive mode is.',
      );
    }
  }

  return responsiveMode;
};

export const useResponsiveMode = (elementRef: React.RefObject<HTMLElement | null>) => {
  const [lastResponsiveMode, setLastResponsiveMode] = React.useState<ResponsiveMode>(
    _defaultMode || _lastMode || ResponsiveMode.large,
  );

  const onResize = useConstCallback(() => {
    // Setting the same value should not cause a re-render.
    setLastResponsiveMode(getResponsiveMode(getWindow(elementRef.current)));
  });

  useOnEvent(window, 'resize', onResize as (ev: Event) => void);

  React.useEffect(() => {
    onResize();
  }, [onResize]);

  return lastResponsiveMode === ResponsiveMode.unknown ? null : useResponsiveMode;
};
