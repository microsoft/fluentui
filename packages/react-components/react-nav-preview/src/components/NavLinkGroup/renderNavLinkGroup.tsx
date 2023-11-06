/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { getSlotsNext } from '@fluentui/react-utilities';
import type { NavLinkGroupState, NavLinkGroupSlots } from './NavLinkGroup.types';

/**
 * Render the final JSX of NavLinkGroup
 */
export const renderNavLinkGroup_unstable = (state: NavLinkGroupState) => {
  const { slots, slotProps } = getSlotsNext<NavLinkGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <slots.root {...slotProps.root} />;
};
