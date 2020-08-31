import * as React from 'react';
import { MenuContextProvider } from './menuContext';
import { useEventListener } from '../../../../react-component-event-listener';

export const Menu = props => {
  const { children, trigger = null, open = false } = props;
  const triggerRef = React.useRef<HTMLDivElement>();
  const menuRef = React.useRef<HTMLDivElement>();

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
      currentIndex: 1,
    },
  );

  const setIndex = React.useCallback(
    index => {
      dispatch({ type: 'SET_INDEX', index });
    },
    [dispatch],
  );

  return (
    <MenuContextProvider
      value={{
        currentIndex: state.currentIndex,
        triggerRef: trigger?.current ? trigger : triggerRef,
        setIndex,
        open: isOpen,
        setOpen,
        menuRef,
      }}
    >
      <div
        onBlur={({ relatedTarget }) => {
          if (
            !menuRef.current?.contains(relatedTarget as Node) &&
            !triggerRef.current?.contains(relatedTarget as Node)
          ) {
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    </MenuContextProvider>
  );
};
