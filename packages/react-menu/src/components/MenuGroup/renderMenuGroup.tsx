import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import { MenuGroupContextValues, MenuGroupSlots, MenuGroupState, MenuGroupRender } from './MenuGroup.types';
import { MenuGroupContextProvider } from '../../contexts/menuGroupContext';

/**
 * Redefine the render function to add slots. Reuse the menugroup structure but add
 * slots to children.
 */
export const renderMenuGroup_unstable: MenuGroupRender = (
  state: MenuGroupState,
  contextValues: MenuGroupContextValues,
) => {
  const { slots, slotProps } = getSlots<MenuGroupSlots>(state);

  return (
    <MenuGroupContextProvider value={contextValues.menuGroup}>
      <slots.root {...slotProps.root} />
    </MenuGroupContextProvider>
  );
};
