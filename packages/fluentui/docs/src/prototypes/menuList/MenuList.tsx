import * as React from 'react';
import { Popup, FocusZone, FocusZoneDirection } from '@fluentui/react-northstar';
import { useMenuContext } from './menuContext';
import { MenuListProvider } from './menuListContext';

export function MenuList({ children }) {
  const { triggerRef, open, currentIndex, setIndex, menuRef, setOpen } = useMenuContext();

  return (
    <Popup
      open={open}
      target={triggerRef}
      position="below"
      trapFocus
      inline
      content={
        <FocusZone
          direction={FocusZoneDirection.vertical}
          isCircularNavigation
          shouldFocusInnerElementWhenReceivedFocus
        >
          <MenuListProvider
            value={{
              currentIndex,
              setIndex,
              setOpen,
              triggerRef,
            }}
          >
            <div ref={menuRef}>{children}</div>
          </MenuListProvider>
        </FocusZone>
      }
    />
  );
}
