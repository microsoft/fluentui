import * as React from 'react';
import { MenuContextValue } from '../contexts/menuContext';

/**
 * Helper function that checks if a focus event moves focus outside of the menu trigger and menu popup
 */
export const isOutsideMenu = ({
  triggerRef,
  menuPopupRef,
  event,
}: {
  triggerRef: MenuContextValue['triggerRef'];
  menuPopupRef: MenuContextValue['menuPopupRef'];
  event: React.FocusEvent;
}) => {
  const isOutsidePopup = !menuPopupRef.current?.contains(event.relatedTarget as Node);
  const isOutsideTrigger = !triggerRef.current?.contains(event.relatedTarget as Node);

  return isOutsidePopup && isOutsideTrigger;
};
