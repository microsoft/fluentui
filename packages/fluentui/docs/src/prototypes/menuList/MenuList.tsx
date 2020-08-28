import * as React from 'react';
import { Popup, FocusZone, FocusZoneDirection } from '../../../../react-northstar';
import { MenuContext } from './useMenu';

export function MenuList({ children, triggerRef, open }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SET_INDEX':
          return { ...prevState, currentIndex: action.index };
        default:
          return prevState;
      }
    },
    {
      currentIndex: -1,
    },
  );
  return (
    <MenuContext.Provider value={{ currentIndex: state.currentIndex, dispatch }}>
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
    </MenuContext.Provider>
  );
}
