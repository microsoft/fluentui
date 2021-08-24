import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
<<<<<<< HEAD
=======
import { MenuGroupContextValues, MenuGroupSlots, MenuGroupState } from './MenuGroup.types';
>>>>>>> Updates react-menu to use root as slot
import { MenuGroupContextProvider } from '../../contexts/menuGroupContext';
import type { MenuGroupContextValues, MenuGroupState } from './MenuGroup.types';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGroup = (state: MenuGroupState, contextValues: MenuGroupContextValues) => {
  const { slots, slotProps } = getSlots<MenuGroupSlots>(state);

  return (
    <MenuGroupContextProvider value={contextValues.menuGroup}>
      <slots.root {...slotProps.root} />
    </MenuGroupContextProvider>
  );
};
