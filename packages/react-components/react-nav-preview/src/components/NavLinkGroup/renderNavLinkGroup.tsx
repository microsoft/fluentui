/** @jsxRuntime classic */
/** @jsx createElement */

import { createElement } from '@fluentui/react-jsx-runtime';
import { assertSlots } from '@fluentui/react-utilities';
import type { NavLinkGroupState, NavLinkGroupSlots } from './NavLinkGroup.types';

/**
 * Render the final JSX of NavLinkGroup
 */
export const renderNavLinkGroup_unstable = (state: NavLinkGroupState) => {
  assertSlots<NavLinkGroupSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
