/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDrawerState, NavDrawerSlots } from './NavDrawer.types';

/**
 * Render the final JSX of NavDrawer
 */
export const renderNavDrawer_unstable = (state: NavDrawerState) => {
  assertSlots<NavDrawerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
