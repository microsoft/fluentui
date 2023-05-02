import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderState, DrawerHeaderSlots } from './DrawerHeader.types';

/**
 * Render the final JSX of DrawerHeader
 */
export const renderDrawerHeader_unstable = (state: DrawerHeaderState) => {
  const { slots, slotProps } = getSlots<DrawerHeaderSlots>(state);

  return <slots.root {...slotProps.root} />;
};
