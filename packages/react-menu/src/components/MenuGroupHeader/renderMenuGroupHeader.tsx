import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
<<<<<<< HEAD
import type { MenuGroupHeaderState } from './MenuGroupHeader.types';
=======
import { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';
>>>>>>> Updates react-menu to use root as slot

/**
 * Redefine the render function to add slots. Reuse the menugroupheader structure but add
 * slots to children.
 */
export const renderMenuGroupHeader = (state: MenuGroupHeaderState) => {
  const { slots, slotProps } = getSlots<MenuGroupHeaderSlots>(state);

  return <slots.root {...slotProps.root} />;
};
