import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerBodyState, DrawerBodySlots } from './DrawerBody.types';

/**
 * Render the final JSX of DrawerBody
 */
export const renderDrawerBody_unstable = (state: DrawerBodyState) => {
  const { slots, slotProps } = getSlots<DrawerBodySlots>(state);

  return <slots.root {...slotProps.root} />;
};
