import * as React from 'react';
import { useEventListener } from '../../../../react-component-event-listener';

export const MenuContext = React.createContext<any>({});

export const useMenuContext = () => React.useContext(MenuContext);

export const useMenu = ({ open }) => {
  const [_open, setOpen] = React.useState(open);
  const triggerRef = React.useRef();

  const toggleMenu = () => {
    setOpen(op => !op);
  };

  const closeMenu = React.useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = React.useCallback(() => {
    setOpen(true);
  }, []);

  const triggerProps = {
    onClick: toggleMenu,
    ref: triggerRef,
  };

  const menuListProps = {
    triggerRef,
    open: _open,
  };

  useEventListener({
    type: 'keydown',
    target: document,
    listener: e => {
      if (e.keyCode === 27) {
        closeMenu();
      }
    },
  });

  return { open: _open, toggleMenu, closeMenu, openMenu, triggerProps, menuListProps };
};
