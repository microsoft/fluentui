import * as React from 'react';

export const isOutsideMenu = ({
  triggerRef,
  menuPopupRef,
  event,
}: {
  triggerRef: React.MutableRefObject<HTMLElement>;
  menuPopupRef: React.MutableRefObject<HTMLElement>;
  event: React.FocusEvent;
}) => {
  const isOutsidePopup = !menuPopupRef.current?.contains(event.relatedTarget as Node);
  const isOutsideTrigger = !triggerRef.current?.contains(event.relatedTarget as Node);

  return isOutsidePopup && isOutsideTrigger;
};
