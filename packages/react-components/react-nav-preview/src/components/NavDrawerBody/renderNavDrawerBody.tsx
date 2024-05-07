/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDrawerBodyState, NavDrawerBodySlots } from './NavDrawerBody.types';

/**
 * Render the final JSX of NavDrawerBody
 */
export const renderNavDrawerBody_unstable = (state: NavDrawerBodyState) => {
  assertSlots<NavDrawerBodySlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
