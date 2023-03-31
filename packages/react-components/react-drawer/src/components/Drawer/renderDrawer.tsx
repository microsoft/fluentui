import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlots<DrawerSlots>(state);

  if (state.type === 'temporary') {
    return slots.dialog && slots.dialogSurface ? (
      <slots.dialog {...slotProps.dialog}>
        <slots.dialogSurface {...slotProps.dialogSurface} />
      </slots.dialog>
    ) : null;
  }

  if (!state.open) {
    return null;
  }

  return <slots.root {...slotProps.root} />;
};
