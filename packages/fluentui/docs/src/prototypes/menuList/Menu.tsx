import * as React from 'react';
import { MenuContext, useMenuContext } from './useMenu';
import { useEventListener } from '../../../../react-component-event-listener';

export const Menu = props => {
  const { children, trigger = null, open = false, index = undefined } = props;
  const triggerRef = React.useRef();
  const menuRef = React.useRef<HTMLDivElement>();

  const { currentIndex } = useMenuContext();

  useEventListener({
    type: 'keydown',
    target: document,
    listener: e => {
      if (e.keyCode === 27) {
        setOpen(false);
      }
    },
  });

  const [isOpen, setOpen] = React.useState(open);
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
        triggerRef: trigger?.current ? trigger : triggerRef,
        dispatch,
        open: index ? currentIndex === index : isOpen || open,
        setOpen,
        menuRef,
      }}
    >
      <div
        role="menu"
        tabIndex={0}
        // onMouseEnter={() => {
        //   // setOpen(true);
        // }}
        // onMouseLeave={() => {
        //   setOpen(false);
        // }}
      >
        {children}
      </div>
    </MenuContext.Provider>
  );
};
