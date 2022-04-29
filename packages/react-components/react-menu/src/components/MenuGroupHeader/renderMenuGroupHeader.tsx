import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuGroupHeaderSlots, MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Redefine the render function to add slots. Reuse the menugroupheader structure but add
 * slots to children.
 */
export const renderMenuGroupHeader_unstable = (state: MenuGroupHeaderState) => {
  const { slots, slotProps } = getSlots<MenuGroupHeaderSlots>(state);

  return <slots.root {...slotProps.root} />;
};
