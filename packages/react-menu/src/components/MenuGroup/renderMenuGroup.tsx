import * as React from 'react';
import { getSlots } from '@fluentui/react-utils';
import { MenuGroupState } from './MenuGroup.types';
import { MenuGroupContextProvider } from '../../menuGroupContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGroup = (state: MenuGroupState) => {
  const { slots, slotProps } = getSlots(state);

  return (
    <MenuGroupContextProvider value={{ headerId: state.headerId }}>
      <slots.root {...slotProps.root}>{state.children}</slots.root>
    </MenuGroupContextProvider>
  );
};
