import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { MenuDividerState } from './MenuDivider.types';

/**
 * Redefine the render function to add slots. Reuse the menudivider structure but add
 * slots to children.
 */
export const renderMenuDivider = (state: MenuDividerState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
