import * as React from 'react';
import { MenuContext, useMenuContext } from './useMenu';

export function Menu({ children, index = undefined }) {
  const triggerRef = React.useRef();
  const { currentIndex } = useMenuContext();

  const [open, setOpen] = React.useState(false);
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
    <MenuContext.Provider
      value={{
        currentIndex: state.currentIndex,
        triggerRef,
        dispatch,
        open: index ? currentIndex === index : open,
        setOpen,
      }}
    >
      <div role="menu">{children}</div>
    </MenuContext.Provider>
  );
}
