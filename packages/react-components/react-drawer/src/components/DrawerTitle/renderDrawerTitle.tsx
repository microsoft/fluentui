import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerTitleState, DrawerTitleSlots } from './DrawerTitle.types';

/**
 * Render the final JSX of DrawerTitle
 */
export const renderDrawerTitle_unstable = (state: DrawerTitleState) => {
  const { slots, slotProps } = getSlots<DrawerTitleSlots>(state);

  return <slots.root {...slotProps.root} />;
};
