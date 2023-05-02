import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { DrawerHeaderNavigationState, DrawerHeaderNavigationSlots } from './DrawerHeaderNavigation.types';

/**
 * Render the final JSX of DrawerHeaderNavigation
 */
export const renderDrawerHeaderNavigation_unstable = (state: DrawerHeaderNavigationState) => {
  const { slots, slotProps } = getSlots<DrawerHeaderNavigationSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
