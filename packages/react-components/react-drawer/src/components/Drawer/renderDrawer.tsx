import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlots<DrawerSlots>(state);

  if (state.type === 'inline' && !state.open) {
    return null;
  }

  if (state.type === 'overlay') {
    return (
      <slots.dialog {...slotProps.dialog}>
        <slots.dialogSurface {...slotProps.dialogSurface} />
      </slots.dialog>
    );
  }

  return <slots.root {...slotProps.root} />;
};
