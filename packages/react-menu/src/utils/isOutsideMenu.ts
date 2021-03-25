import * as React from 'react';
import { MenuContextValue } from '../contexts/menuContext';

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
