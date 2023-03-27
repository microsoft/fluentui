import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerState, DrawerSlots } from './Drawer.types';
import { DialogProps } from '@fluentui/react-dialog';

/**
 * Render the final JSX of Drawer
 */
export const renderDrawer_unstable = (state: DrawerState) => {
  const { slots, slotProps } = getSlots<DrawerSlots>(state);

  if (state.type === 'temporary') {
    return (
      <slots.dialog {...(slotProps.dialog as DialogProps)}>
        <slots.dialogSurface {...slotProps.dialogSurface} />
      </slots.dialog>
    );
  }

  if (!state.isMounted) {
    return null;
  }

  return <slots.root {...slotProps.root} />;
};
