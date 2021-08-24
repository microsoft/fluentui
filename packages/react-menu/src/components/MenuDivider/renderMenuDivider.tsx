import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
<<<<<<< HEAD
import type { MenuDividerState } from './MenuDivider.types';
=======
import { MenuDividerSlots, MenuDividerState } from './MenuDivider.types';
>>>>>>> Updates react-menu to use root as slot

/**
 * Redefine the render function to add slots. Reuse the menudivider structure but add
 * slots to children.
 */
export const renderMenuDivider = (state: MenuDividerState) => {
  const { slots, slotProps } = getSlots<MenuDividerSlots>(state);

  return <slots.root {...slotProps.root} />;
};
