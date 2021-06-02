import * as React from 'react';
import { MenuContextValue } from '../contexts/menuContext';

/**
 * Helper function that checks if a blur event moves focus outside of the menu trigger and menu popup
 * Only needed for focus moving between nested submenus with mouse
 */
export const isOutsideMenu = ({
  triggerRef,
  menuPopupRef,
  event,
}: {
  triggerRef: MenuContextValue['triggerRef'];
  menuPopupRef: MenuContextValue['menuPopupRef'];
  event: React.FocusEvent; // onBlur
}) => {
  // no related target -> nothing got focus
  // don't need to handle this because focus did not move between submenus
  if (!event.relatedTarget) {
    return false;
  }

  const isOutsidePopup = !menuPopupRef.current?.contains(event.relatedTarget as Node);
  const isOutsideTrigger = !triggerRef.current?.contains(event.relatedTarget as Node);

  return isOutsidePopup && isOutsideTrigger;
};
