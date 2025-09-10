import * as React from 'react';

/**
 * Name of the custom event
 */
export const MENU_SAFEZONE_TIMEOUT_EVENT = 'fuimenusafezonetimeout';

/**
 * This hook listeners on a menu trigger for a custom event for an indication that a safe zone was closed over the
 * matching item.
 */
export const useOnMenuSafeZoneTimeout = (listener: () => void): ((element: HTMLElement | null) => void) => {
  const elementRef = React.useRef<HTMLElement | null>(null);

  return React.useCallback(
    (element: HTMLElement | null) => {
      elementRef.current?.removeEventListener(MENU_SAFEZONE_TIMEOUT_EVENT, listener);
      element?.addEventListener(MENU_SAFEZONE_TIMEOUT_EVENT, listener);

      elementRef.current = element;
    },
    [listener],
  );
};
