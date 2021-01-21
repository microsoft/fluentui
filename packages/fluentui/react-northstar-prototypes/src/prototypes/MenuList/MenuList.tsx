import * as React from 'react';
import { Popup, FocusZone, FocusZoneDirection } from '@fluentui/react-northstar';
import { useMenuContext } from './menuContext';
import { MenuListProvider } from './menuListContext';

export function MenuList({ children }) {
  const { triggerRef, currentIndex, setIndex, menuRef, setOpen } = useMenuContext();
  const [checkedItems, setCheckedItems] = React.useState<number[]>([]);

  const onItemChecked = (item: number) => setCheckedItems(s => [...s, item]);
  const onItemUnChecked = (item: number) =>
    setCheckedItems(s => {
      const newArray = [...s];
      const index = newArray.indexOf(item);
      if (index > -1) {
        newArray.splice(index, 1);
      }

      return newArray;
    });

  return (
    <Popup
      open={true}
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
              checkedItems,
              onItemChecked,
              onItemUnChecked,
            }}
          >
            <div ref={menuRef}>{children}</div>
          </MenuListProvider>
        </FocusZone>
      }
    />
  );
}
