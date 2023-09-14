/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { NavLinkState, NavLinkSlots } from './NavLink.types';

/**
 * Render the final JSX of NavLink
 */
export const renderNavLink_unstable = (state: NavLinkState) => {
  const { slots, slotProps } = getSlotsNext<NavLinkSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
