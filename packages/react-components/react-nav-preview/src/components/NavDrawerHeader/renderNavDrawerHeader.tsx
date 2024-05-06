/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDrawerHeaderState, NavDrawerHeaderSlots } from './NavDrawerHeader.types';

/**
 * Render the final JSX of NavDrawerHeader
 */
export const renderNavDrawerHeader_unstable = (state: NavDrawerHeaderState) => {
  assertSlots<NavDrawerHeaderSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
