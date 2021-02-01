import * as React from 'react';
import { MenuListProvider } from './menuListContext';

export const MenuList = React.forwardRef((props: { children: React.ReactNode }) => {
  const { children } = props;

  return (
    <MenuListProvider value={{ triggerRef: null }}>
      <div role="menu">{children}</div>
    </MenuListProvider>
  );
});

MenuList.displayName = 'MenuList';
