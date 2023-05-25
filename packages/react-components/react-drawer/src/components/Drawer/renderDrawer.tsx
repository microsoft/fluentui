/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';

import { getSlotsNext } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlotsNext<DrawerSlots>(state);

  return <slots.root {...slotProps.root} />;
};
