import * as React from 'react';
import { MenuListProvider } from './menuListContext';

export const MenuList = React.forwardRef((props: { children: React.ReactNode }) => {
  const { children } = props;
  const [index, setIndex] = React.useState(0);
  const setOpen = () => null;
  return (
    <MenuListProvider value={{ triggerRef: null, setIndex, setOpen, currentIndex: index }}>{children}</MenuListProvider>
  );
});

MenuList.displayName = 'MenuList';

// MenuList.displayName = 'MenuList';
