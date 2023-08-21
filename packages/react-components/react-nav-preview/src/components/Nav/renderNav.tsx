/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { NavState, NavSlots } from './Nav.types';

/**
 * Render the final JSX of Nav
 */
export const renderNav_unstable = (state: NavState) => {
  const { slots, slotProps } = getSlotsNext<NavSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
