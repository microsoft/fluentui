import * as React from 'react';

import { MenuList, MenuItem, FocusAbilityContextProvider } from '@fluentui/react-menu';

export const MenuListExample = () => (
  <FocusAbilityContextProvider>
    <MenuList>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
      <MenuItem>Item</MenuItem>
    </MenuList>
  </FocusAbilityContextProvider>
);

export const MenuListWithIconsExample = () => (
  <FocusAbilityContextProvider>
    <MenuList>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
      <MenuItem icon="X">Item</MenuItem>
    </MenuList>
  </FocusAbilityContextProvider>
);
