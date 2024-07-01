/** @jsxRuntime automatic */
/** @jsxImportSource @fluentui/react-jsx-runtime */

import { assertSlots } from '@fluentui/react-utilities';
import type { NavDividerState, NavDividerSlots } from './NavDivider.types';

/**
 * Render the final JSX of NavDivider
 */
export const renderNavDivider_unstable = (state: NavDividerState) => {
  assertSlots<NavDividerSlots>(state);

  // TODO Add additional slots in the appropriate place
  return <state.root />;
};
