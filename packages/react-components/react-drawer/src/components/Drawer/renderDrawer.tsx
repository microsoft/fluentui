import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlots<DrawerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
