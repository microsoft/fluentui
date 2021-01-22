import * as React from 'react';
import { Popup, FocusZone, FocusZoneDirection } from '@fluentui/react-northstar';
import { useMenuContext } from './menuContext';
import { MenuListProvider } from './menuListContext';

export function MenuList({ children }) {
  const {
    triggerRef,
    open,
    currentIndex,
    setIndex,
    menuRef,
    setOpen,
    onCheckedValuesChange: onRootCheckedValuesChange,
  } = useMenuContext();
  const [checkedValues, setCheckedValues] = React.useState<Record<string, number[]>>({});

  const onCheckedValuesChange = (name: string, items: number[]) =>
    setCheckedValues(s => {
      const newState = { ...s, [name]: items };
      onRootCheckedValuesChange(newState);
      return newState;
    });

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
              checkedValues,
              onCheckedValuesChange,
            }}
          >
            <div ref={menuRef}>{children}</div>
          </MenuListProvider>
        </FocusZone>
      }
    />
  );
}
