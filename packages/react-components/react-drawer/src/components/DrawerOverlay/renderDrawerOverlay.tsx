import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerOverlayState, DrawerOverlaySlots } from './DrawerOverlay.types';
import { Dialog } from '@fluentui/react-dialog';

/**
 * Render the final JSX of DrawerOverlay
 */
export const renderDrawerOverlay_unstable = (state: DrawerOverlayState) => {
  const { slots, slotProps } = getSlots<DrawerOverlaySlots>(state);

  return (
    <Dialog {...state.dialog}>
      <slots.root {...slotProps.root} />
    </Dialog>
  );
};
