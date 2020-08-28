import * as React from 'react';
import { Popup, FocusZone, FocusZoneDirection } from '../../../../react-northstar';
import { useMenuContext } from './useMenu';

export function MenuList({ children }) {
  const { triggerRef, open } = useMenuContext();

  return (
    <Popup
      open={open}
      target={triggerRef}
      position="below"
      trapFocus
      content={
        <FocusZone
          direction={FocusZoneDirection.vertical}
          isCircularNavigation
          shouldFocusInnerElementWhenReceivedFocus
        >
          {children}
        </FocusZone>
      }
    />
  );
}
