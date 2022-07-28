import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DialogSurfaceState, DialogSurfaceSlots } from './DialogSurface.types';

/**
 * Render the final JSX of DialogSurface
 */
export const renderDialogSurface_unstable = (state: DialogSurfaceState) => {
  const { slots, slotProps } = getSlots<DialogSurfaceSlots>(state);

  return <slots.root {...slotProps.root} />;
};
