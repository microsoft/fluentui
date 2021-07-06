import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { MenuGroupHeaderState } from './MenuGroupHeader.types';

/**
 * Redefine the render function to add slots. Reuse the menugroupheader structure but add
 * slots to children.
 */
export const renderMenuGroupHeader = (state: MenuGroupHeaderState) => {
  const { slots, slotProps } = getSlotsCompat(state);

  return <slots.root {...slotProps.root}>{state.children}</slots.root>;
};
