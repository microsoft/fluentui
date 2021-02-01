import * as React from 'react';
import { createAbilityHelpers, getAbilityHelpersAttribute, getOutline } from 'ability-helpers';
import { MenuListProvider } from './menuListContext';

export const MenuList = React.forwardRef((props: { children: React.ReactNode }) => {
  const ah = createAbilityHelpers(window);
  const ahOutline = getOutline(ah);
  ahOutline.setup();

  const { children } = props;
  const setOpen = () => null;
  const setIndex = () => null;

  return (
    <MenuListProvider value={{ triggerRef: null, setIndex, setOpen, currentIndex: 0 }}>
      <div role="menu" {...getAbilityHelpersAttribute({ root: {} })}>
        {children}
      </div>
    </MenuListProvider>
  );
});

MenuList.displayName = 'MenuList';

// MenuList.displayName = 'MenuList';
