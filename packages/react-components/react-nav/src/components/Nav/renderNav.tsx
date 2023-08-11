import * as React from 'react';
import { getSlots } from '@fluentui/react-utilities';
import type { NavState, NavSlots } from './Nav.types';

/**
 * Render the final JSX of Nav
 */
export const renderNav_unstable = (state: NavState) => {
  const { slots, slotProps } = getSlots<NavSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
