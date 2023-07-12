import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerFooterState, DrawerFooterSlots } from './DrawerFooter.types';

/**
 * Render the final JSX of DrawerFooter
 */
export const renderDrawerFooter_unstable = (state: DrawerFooterState) => {
  const { slots, slotProps } = getSlots<DrawerFooterSlots>(state);

  return <slots.root {...slotProps.root} />;
};
