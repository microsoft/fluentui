import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderTitleState, DrawerHeaderTitleSlots } from './DrawerHeaderTitle.types';

/**
 * Render the final JSX of DrawerHeaderTitle
 */
export const renderDrawerHeaderTitle_unstable = (state: DrawerHeaderTitleState) => {
  const { slots, slotProps } = getSlots<DrawerHeaderTitleSlots>(state);

  return (
    <slots.root {...slotProps.root}>
      {slots.heading && <slots.heading {...slotProps.heading} />}
      {slots.action && <slots.action {...slotProps.action} />}
    </slots.root>
  );
};
